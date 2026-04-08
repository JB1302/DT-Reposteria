# 🍰 DT Repostería - Full Stack Application

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.4-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-FullStack-blueviolet)
![Status](https://img.shields.io/badge/Status-In%20Development-pink)

---

## 📌 Project Overview

DT Repostería is a full-stack web application designed to manage a bakery system, including clients, categories, products, and orders.

The system integrates a responsive frontend with a RESTful API built in Express.js and a MongoDB database with strict schema validation.

---

## 🧩 Architecture

Frontend (HTML, Bootstrap, JS)
↓
REST API (Express.js)
↓
Database (MongoDB)

---

## 🚀 Features

- Full CRUD operations:
  - Clients
  - Categories
  - Products
  - Orders

- Advanced order system:
  - Client validation
  - Product validation
  - Stock validation
  - Automatic total calculation
  - Stock update after purchase

- Clean modular architecture:
  - Controllers
  - Services
  - Models
  - Routes

- API-driven frontend

- Responsive UI with Bootstrap

- Real product images via URLs

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- Bootstrap 4
- JavaScript (ES6)
- jQuery

### Backend

- Node.js
- Express.js

### Database

- MongoDB (with schema validation)

---

## 📁 Project Structure

```
DT Reposteria - FullStack/
│
├── API/
│   ├── src/
│   │   ├── Config/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Routes/
│   │   ├── Services/
│   │   └── app.js
│   ├── package.json
│   └── package-lock.json
│
├── assets/
│   ├── css/
│   └── static/
│
├── DB Inserts/
│   ├── categorias.json
│   ├── clientes.json
│   ├── productos.json
│   └── ordenes.json
│
├── shared/
│   ├── components/
│   │   ├── navbar.html
│   │   └── footer.html
│   ├── js/
│   │   └── components.js
│
├── pages/
│   ├── Home.html
│   ├── Clientes.html
│   ├── Categorias.html
│   ├── Productos.html
│   ├── Ordenes.html
│   └── hacerPedido.html
```

---

## 🔗 API Endpoints

### Clients

GET /api/clientes - Retrieve all clients  
GET /api/clientes/:id - Retrieve one client by ID  
POST /api/clientes - Create a new client  
PUT /api/clientes/:id - Update an existing client  
DELETE /api/clientes/:id - Delete a client

### Categories

GET /api/categorias - Retrieve all categories  
GET /api/categorias/:id - Retrieve one category by ID  
POST /api/categorias - Create a new category  
PUT /api/categorias/:id - Update an existing category  
DELETE /api/categorias/:id - Delete a category

### Products

GET /api/productos - Retrieve all products  
GET /api/productos/:id - Retrieve one product by ID  
POST /api/productos - Create a new product  
PUT /api/productos/:id - Update an existing product  
DELETE /api/productos/:id - Delete a product

### Orders

GET /api/ordenes - Retrieve all orders  
GET /api/ordenes/:id - Retrieve one order by ID  
POST /api/ordenes - Create an order manually  
PUT /api/ordenes/:id - Update an order  
DELETE /api/ordenes/:id - Delete an order

### Order Processing

POST /api/ordenes/hacer-pedido - Create an order with validation, stock control, and automatic calculations

---

## ⚙️ Setup & Usage

### Backend

1. Navigate to API:
   cd API

2. Install dependencies:
   npm install

3. Run the server:
   npm run dev

4. Server runs on:
   http://127.0.0.1:5000

---

### Frontend

1. Open project folder

2. Run using Live Server or open:
   pages/Home.html

3. Make sure backend is running before testing

---

## 📸 UI Preview

- Landing page with branding
- CRUD interfaces for all modules
- Order creation flow
- Responsive pastel design

---

## 📌 Notes

- Built as an academic full-stack project
- Uses MongoDB with strict validation
- Follows layered architecture (Controller-Service-Model)
- API tested using Postman

---

## 👨‍💻 Author

Jonathan Steven Barrantes Jiménez

---

## 📄 License

Educational and academic use only
