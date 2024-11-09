const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .sort({ datePosted: -1 });
    res.json(products);
  } catch (err) {
    console.error(`Error fetching products: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Lấy sản phẩm theo trang
router.get('/page/:page', async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.params.page, 10) || 1;

  try {
    const products = await Product.find()
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('category')
      .sort({ datePosted: -1 });
    res.json(products);
  } catch (err) {
    console.error(`Error fetching products: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Tìm sản phẩm theo tên và category
router.get('/search', async (req, res) => {
  const { productName, categoryId } = req.query;

  try {
    let query = {};

    if (productName) {
      query.productName = new RegExp(productName, 'i');
    }

    if (categoryId) {
      query.category = categoryId;
    }

    const products = await Product.find(query).populate('category');
    res.json(products);
  } catch (err) {
    console.error(`Error searching products: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Lọc sản phẩm theo giá và ngày đăng
router.get('/filter', async (req, res) => {
  const { minPrice, maxPrice, startDate, endDate } = req.query;
  const filter = {};

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }

  if (startDate || endDate) {
    filter.datePosted = {};
    if (startDate) {
      filter.datePosted.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.datePosted.$lte = new Date(endDate);
    }
  }

  try {
    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    console.error(`Error filtering products: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).populate('category');

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(`Error fetching product: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
  const { productName, category, price, description, stock, images, specifications, manufacturer, modelNumber } = req.body;

  try {
    const newProduct = new Product({
      productName,
      category,
      price,
      description,
      stock,
      images,
      specifications,
      manufacturer,
      modelNumber
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(`Error adding product: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Sửa sản phẩm
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const { productName, category, price, description, stock, images, specifications, manufacturer, modelNumber } = req.body;

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.productName = productName || product.productName;
    product.category = category || product.category;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.images = images || product.images;
    product.specifications = specifications || product.specifications;
    product.manufacturer = manufacturer || product.manufacturer;
    product.modelNumber = modelNumber || product.modelNumber;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(`Error updating product: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Kiểm tra ID có hợp lệ không
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error(`Invalid product ID: ${productId}`);
      return res.status(400).json({ msg: 'Invalid product ID' });
    }

    // Tìm và xóa sản phẩm theo ID
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      console.error(`Product not found: ${productId}`);
      return res.status(404).json({ msg: 'Product not found' });
    }

    console.log(`Product removed: ${productId}`);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(`Error deleting product: ${err.message}`);
    res.status(500).send(`Server error: ${err.message}`);
  }
});

module.exports = router;