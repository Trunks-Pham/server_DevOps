const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, password, fullName, dateOfBirth, email, phoneNumber, gender, address } = req.body;

  try {
    console.log('Đang kiểm tra người dùng tồn tại');
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    console.log('Đang tạo người dùng mới');
    user = new User({
      username,
      password,
      fullName,
      dateOfBirth,
      email,
      phoneNumber,
      gender,
      address,
      accountStatus: 'Active'
    });

    console.log('Đang băm mật khẩu');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log('Đang lưu người dùng mới');
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Đang tạo token JWT');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          msg: 'Hoàn Tất Đăng Ký',
          token 
        });
      }
    );
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err.message);
    res.status(500).send('Server error');
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Đang kiểm tra người dùng');
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Đang kiểm tra mật khẩu');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log('Đang tạo token JWT');
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: 'Đăng Nhập Thành Công',
          token,
          user: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            address: user.address,
            accountStatus: user.accountStatus
          }
        });
      }
    );
  } catch (err) {
    console.error('Lỗi khi đăng nhập:', err.message);
    res.status(500).send('Server error');
  }
});

// Lấy danh sách tất cả người dùng
router.get('/users', async (req, res) => {
  try {
    console.log('Đang lấy danh sách tất cả người dùng');
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách người dùng:', err.message);
    res.status(500).send('Server error');
  }
});

// Tìm người dùng theo fullName
router.get('/users/fullName/:fullName', async (req, res) => {
  try {
    const fullName = req.params.fullName;
    const regex = new RegExp(fullName, 'i'); // 'i' để không phân biệt chữ hoa chữ thường
    const users = await User.find({ fullName: regex }).select('-password');

    if (users.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(users);
  } catch (err) {
    console.error('Lỗi khi tìm người dùng:', err.message);
    res.status(500).send('Server error');
  }
});

// Tìm người dùng theo _id
router.get('/users/id/:id', async (req, res) => {
  try {
    console.log('Đang tìm người dùng theo _id');
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Lỗi khi tìm người dùng:', err.message);
    res.status(500).send('Server error');
  }
});

router.put('/users/:id', async (req, res) => {
  const { fullName, dateOfBirth, email, phoneNumber, gender, address, accountStatus } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.fullName = fullName || user.fullName;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gender = gender || user.gender;
    user.address = address || user.address;
    user.accountStatus = 
      ['Active', 'Inactive', 'Suspended'].includes(accountStatus) ? 
      accountStatus : user.accountStatus;

    await user.save();
    res.json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error('Lỗi khi cập nhật người dùng:', err.message);
    res.status(500).send('Server error');
  }
});


// Xóa người dùng
router.delete('/users/:id', async (req, res) => {
  try {
    console.log('Đang xóa người dùng');
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.remove();
    res.json({ msg: 'User removed successfully' });
  } catch (err) {
    console.error('Lỗi khi xóa người dùng:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
