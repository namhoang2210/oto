## Dự án website mua bán oto Reactjs + Nodejs + MongoDB

## Yêu Cầu Hệ Thống

- [Node.js](https://nodejs.org/) phiên bản 20.x hoặc mới hơn.
- [MongoDB](https://www.mongodb.com/) phiên bản 6.x hoặc mới hơn.

## Cài Đặt

### Setup backend

1. **Trỏ đến thư mục back-end**

   ```bash
   cd back-end
   ```

2. **Cài đặt các package phụ thuộc**:

   ```bash
   npm install
   ```

3. **Config file .env**:

   - MONGODB_URI: Đường dẫn kết nối đến cơ sở dữ liệu MongoDB.

4. **Tạo tài khoản admin mặc định để đăng nhập hệ thống**

   ```bash
   npm run seed:admin
   ```

5. **Chạy ứng dụng**:

   ```bash
   node server.js
   ```

### Setup frontend

1. **Trỏ đến thư mục front-end**

   ```bash
   cd front-end
   ```

2. **Cài đặt các package phụ thuộc**:

   ```bash
   npm install
   ```

3. **Chạy ứng dụng**:

   ```bash
   npm start
   ```

3. **Truy cập url admin**:
    - http://localhost:3000/admin/login
    - Do chưa hoàn thành phía customer (đăng kí, tạo đơn hàng) nên data customer, order, payment trong màn admin có thể tạo thông qua API(file postman đã đính kèm)