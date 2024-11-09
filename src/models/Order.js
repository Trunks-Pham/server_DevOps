const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // Người dùng đã đặt hàng
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Danh sách sản phẩm trong đơn hàng với chi tiết
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },  // Số lượng của sản phẩm
      price: { type: Number, required: true }  // Giá của sản phẩm tại thời điểm đặt hàng
    }
  ],
  // Tổng số tiền của đơn hàng
  totalAmount: { 
    type: Number, 
    required: true 
  },
  // Ngày đặt hàng
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
  // Trạng thái đơn hàng
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
  // Thông tin địa chỉ giao hàng
  shippingAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  // Phương thức giao hàng
  shippingMethod: { 
    type: String, 
    enum: ['Standard', 'Express', 'Overnight'], 
    default: 'Standard' 
  },
  // Trạng thái thanh toán
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed'], 
    default: 'Pending' 
  }
});

module.exports = mongoose.model('Order', OrderSchema);
