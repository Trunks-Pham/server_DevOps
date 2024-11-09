const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // Tên sản phẩm
  productName: { 
    type: String, 
    required: true, 
    trim: true  // Loại bỏ khoảng trắng thừa ở đầu và cuối
  },
  // Danh mục sản phẩm, liên kết với model Category
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  // Giá của sản phẩm
  price: { 
    type: Number, 
    required: true, 
    min: 0  // Giá không được âm
  },
  // Mô tả sản phẩm
  description: { 
    type: String, 
    trim: true  // Loại bỏ khoảng trắng thừa ở đầu và cuối
  },
  // Số lượng sản phẩm có trong kho
  stock: { 
    type: Number, 
    required: true, 
    min: 0  // Số lượng không được âm
  },
  // Danh sách các URL hình ảnh của sản phẩm
  images: [{ 
    type: String 
  }],
  // Thông số kỹ thuật của sản phẩm dưới dạng Map
  specifications: { 
    type: Map, 
    of: String  // Lưu trữ các đặc điểm kỹ thuật dưới dạng key-value
  },
  // Tên nhà sản xuất của sản phẩm
  manufacturer: { 
    type: String 
  },
  // Số model của sản phẩm
  modelNumber: { 
    type: String 
  },
  // Ngày đăng sản phẩm
  datePosted: { 
    type: Date, 
    default: Date.now  // Mặc định là thời điểm hiện tại
  },
  // Ngày cập nhật thông tin sản phẩm
  updatedAt: { 
    type: Date, 
    default: Date.now  // Mặc định là thời điểm hiện tại
  },
  // Trạng thái hoạt động của sản phẩm (kích hoạt hay không)
  isActive: { 
    type: Boolean, 
    default: true  // Mặc định là true, nghĩa là sản phẩm đang hoạt động
  }
});

// Thêm chỉ mục cho trường productName để tìm kiếm nhanh hơn
ProductSchema.index({ productName: 1 });

// Cập nhật trường updatedAt trước khi lưu sản phẩm
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
