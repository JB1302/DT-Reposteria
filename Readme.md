# 🍰 DT Repostería - Frontend

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.4-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-brightgreen)
![Status](https://img.shields.io/badge/Status-In%20Development-pink)

---

## 📌 Project Overview

DT Repostería is a modern web application designed to manage a bakery system through a clean and responsive user interface.

This repository contains the frontend layer of a full-stack application, built to interact with a REST API developed in Express.js, which connects to a MongoDB database.

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

- Dynamic UI using:
  - jQuery
  - Bootstrap components

- Order management system

- API integration with Express

- Real product images via URLs

- Clean and responsive design

---

## 🛠️ Technologies Used

Frontend:

- HTML5
- CSS3
- Bootstrap 4
- JavaScript (ES6)
- jQuery

Backend (External API):

- Node.js
- Express.js

Database:

- MongoDB

---

## 📁 Project Structure

/frontend
│
├── pages/
│ ├── home/
│ ├── clientes/
│ ├── categorias/
│ ├── productos/
│ └── ordenes/
│
├── assets/
│ ├── css/
│ ├── js/
│ └── static/
│
├── components/
│ ├── navbar
│ └── footer
│
└── index.html

---

## 🔗 API Integration

GET /api/productos
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id

Similar endpoints exist for:

- /clientes
- /categorias
- /ordenes

---

## ⚙️ Setup & Usage

1. Clone the repository:
   git clone https://github.com/your-username/dt-reposteria-frontend.git

2. Open the project:
   cd dt-reposteria-frontend

3. Run using Live Server or open index.html manually.

4. Make sure the backend API is running:
   http://localhost:3000

---

## 📸 UI Preview

- Landing page with branding and CTA
- CRUD views for each module
- Clean pastel color palette UI

---

## 📌 Notes

- This project is part of a full-stack academic implementation.
- The frontend is designed to be lightweight and API-driven.
- MongoDB uses a NoSQL schema with references via ObjectId.

---

## 👨‍💻 Author

Jonathan Steven Barrantes Jiménez

---

## 📄 License

This project is for academic and educational purposes.
