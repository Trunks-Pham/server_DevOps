 # Server DevOps Project

This project provides a server-side application aimed at efficiently managing sales data. It focuses on security, scalability, and maintainability, with support for Docker and Docker Compose for seamless deployment.

## Key Features
- **Authentication and Authorization**: Implements JWT-based authentication and user management.
- **Database Integration**: Uses MongoDB with Mongoose for efficient data storage and retrieval.
- **Environment Configuration**: Manages sensitive information securely with dotenv.
- **Docker Integration**: Supports rapid application deployment with Docker.
- **Docker Compose**: Manages services (application and database) through a single configuration file.

## Project Structure
- **`src/`**: Contains the main source code, including routes and controllers.
- **`config/`**: Manages environment-specific configurations.
- **`Dockerfile`**: Builds the Docker image for the Node.js application.
- **`docker-compose.yml`**: Defines the services for the application and MongoDB.

## Key Dependencies
- **Express**: Fast, minimalist web framework for Node.js.
- **Mongoose**: MongoDB ODM for schema modeling and data validation.
- **jsonwebtoken**: Secure token handling for authentication.
- **bcryptjs**: Library for password hashing.
- **dotenv**: Handles environment variable configuration.

## Installation Guide
### Using Docker
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Trunks-Pham/server_devops.git
   cd server_devops
   ```
2. **Set Up Environment Variables**:
   Create a `.env` file based on `.env.example` and configure the necessary variables like `PORT`, `DB_URI`, and `JWT_SECRET`.
3. **Start Services with Docker Compose**:
   ```bash
   docker-compose up -d
   ```
4. **Verify the Application**:
   The application will be accessible on the port specified in the `PORT` environment variable (default: `3000`).

### Manual Installation with Node.js
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Application**:
   ```bash
   npm start
   ```

## Development
- **Scripts**:
  - `npm start`: Starts the Node.js server.
  - `docker-compose down`: Stops and removes all running containers.

## Deployment
- Supports deployment with Docker on cloud services like AWS, Azure, or GCP.
- Easily scalable and manageable with Docker Compose.

## License
This project is licensed under the **ISC** license. Refer to the `LICENSE` file for more details.

## Contributions
Feel free to submit issues or pull requests to contribute to this project.
 
---

# Dự án Server DevOps

Dự án này cung cấp một ứng dụng phía server nhằm quản lý dữ liệu bán hàng một cách hiệu quả. Ứng dụng được thiết kế với các tiêu chí bảo mật, khả năng mở rộng, và dễ bảo trì, đồng thời hỗ trợ triển khai qua Docker và Docker Compose.

## Tính năng nổi bật
- **Xác thực và phân quyền**: Sử dụng JWT để xác thực và quản lý người dùng.
- **Kết nối cơ sở dữ liệu**: Sử dụng MongoDB với Mongoose để lưu trữ và truy xuất dữ liệu.
- **Quản lý cấu hình môi trường**: Sử dụng dotenv để bảo mật thông tin cấu hình nhạy cảm.
- **Tích hợp Docker**: Hỗ trợ xây dựng và triển khai ứng dụng nhanh chóng với Docker.
- **Docker Compose**: Tạo và quản lý các dịch vụ container (ứng dụng và cơ sở dữ liệu) trong một tệp cấu hình.

## Cấu trúc dự án
- **`src/`**: Chứa mã nguồn chính, bao gồm các tệp định tuyến và điều khiển.
- **`config/`**: Quản lý các cấu hình dành riêng cho từng môi trường.
- **`Dockerfile`**: Xây dựng hình ảnh Docker cho ứng dụng Node.js.
- **`docker-compose.yml`**: Tệp cấu hình Docker Compose để chạy ứng dụng và MongoDB.

## Phụ thuộc chính
- **Express**: Framework web nhanh và nhẹ dành cho Node.js.
- **Mongoose**: ODM MongoDB để mô hình hóa và kiểm tra dữ liệu.
- **jsonwebtoken**: Quản lý token an toàn cho xác thực.
- **bcryptjs**: Thư viện mã hóa mật khẩu.
- **dotenv**: Quản lý cấu hình môi trường.

## Hướng dẫn cài đặt
### Cài đặt qua Docker
1. **Clone kho mã**:
   ```bash
   git clone https://github.com/Trunks-Pham/server_devops.git
   cd server_devops
   ```
2. **Tạo tệp `.env`**:
   Dựa trên mẫu `.env.example`, cấu hình các biến môi trường cần thiết như `PORT`, `DB_URI`, và `JWT_SECRET`.
3. **Khởi chạy dịch vụ bằng Docker Compose**:
   ```bash
   docker-compose up -d
   ```
4. **Kiểm tra ứng dụng**:
   Ứng dụng sẽ chạy trên cổng được chỉ định trong biến `PORT` (mặc định là `3000`).

### Cài đặt qua Node.js
1. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```
2. **Chạy ứng dụng**:
   ```bash
   npm start
   ```

## Phát triển
- **Scripts**:
  - `npm start`: Khởi chạy máy chủ Node.js.
  - `docker-compose down`: Tắt và xóa tất cả container.

## Triển khai
- Hỗ trợ triển khai bằng Docker lên các dịch vụ cloud như AWS, Azure, hoặc GCP.
- Dễ dàng mở rộng và quản lý với Docker Compose.

## Giấy phép
Dự án này được cấp phép theo giấy phép **ISC**. Tham khảo chi tiết trong tệp `LICENSE`.

## Đóng góp
Hãy thoải mái gửi các vấn đề (issues) hoặc yêu cầu hợp nhất (pull requests) để đóng góp cho dự án.

---
