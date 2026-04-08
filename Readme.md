# 🍰 DT Repostería

<div align="center">

![Status](https://img.shields.io/badge/status-active-22c55e?style=for-the-badge)
![Architecture](https://img.shields.io/badge/architecture-frontend%20%2B%20api-6366f1?style=for-the-badge)
![Node](https://img.shields.io/badge/node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-4.4-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Full stack application for managing customers, categories, products, and orders for a pastry business.**

</div>

---

## ✨ Overview

**DT Repostería** is a web project with a static frontend + REST API that allows you to manage the main workflow of a pastry business:

- CRUD management for customers, categories, products, and orders.
- Order registration with customer/product validation.
- Real-time stock control during order creation.
- Automatic calculation of total quantity and total amount due.

Its modular design makes the code easier to maintain and scale.

---

## 🧱 Project Architecture

```text
Frontend (HTML + Bootstrap + JS)
          │
          ▼
     REST API (Express)
          │
          ▼
   MongoDB (Mongoose)
```

### Main Structure

```bash
DT-Reposteria/
├── API/
│   ├── src/
│   │   ├── Config/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Routes/
│   │   ├── Services/
│   │   └── app.js
│   └── package.json
├── shared/
│   ├── components/
│   ├── js/
│   └── pages/
├── assets/
│   ├── css/
│   └── static/
└── DB Inserts/
    ├── categorias.json
    ├── clientes.json
    ├── productos.json
    └── ordenes.json
```

---

## 🧩 Key Features

### 1) Catalog Management

- Customers
- Categories
- Products
- Orders

### 2) Smart Order Flow (`/api/ordenes/hacer-pedido`)

Includes critical business rules:

- Verifies that the customer exists.
- Verifies that the submitted products exist.
- Validates quantities (> 0).
- Validates stock availability for each product.
- Deducts stock once the order is confirmed.
- Automatically calculates:
  - `cantidadTotal`
  - `totalPagar`
- Initializes the order status as `Pendiente`.

---

## 🛠️ Technology Stack

| Layer    | Technologies                                         |
| -------- | ---------------------------------------------------- |
| Frontend | HTML5, CSS3, Bootstrap 4.4, JavaScript (ES6), jQuery |
| Backend  | Node.js, Express 5, body-parser, cors                |
| Database | MongoDB + Mongoose                                   |

---

## 🚀 Local Setup

### Prerequisites

- Node.js installed.
- MongoDB running locally.
- MongoDB port configured as in the project: `21313`.

> The API attempts to connect to: `mongodb://127.0.0.1:21313/DTreposteria`.

### 1) Start the API

```bash
cd API
npm install
npm run dev
```

Default server: `http://localhost:5000`

### 2) Run the frontend

You can open the views directly from `shared/pages/`, but it is recommended to use a static server (for example, Live Server) to avoid `fetch` restrictions when loading components.

Suggested home page:

```text
shared/pages/Home.html
```

---

## 📡 REST Endpoints

### Customers

- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id`

### Categories

- `GET /api/categorias`
- `GET /api/categorias/:id`
- `POST /api/categorias`
- `PUT /api/categorias/:id`
- `DELETE /api/categorias/:id`

### Products

- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

### Orders

- `GET /api/ordenes`
- `GET /api/ordenes/:id`
- `POST /api/ordenes`
- `POST /api/ordenes/hacer-pedido`
- `PUT /api/ordenes/:id`
- `DELETE /api/ordenes/:id`

---

## 🧪 Available Scripts (API)

```bash
npm run start   # starts the server with node
npm run dev     # starts the server with nodemon
```

---

## 📦 Seed Data

The **`DB Inserts/`** folder includes JSON documents to populate test collections:

- `clientes.json`
- `categorias.json`
- `productos.json`
- `ordenes.json`

Ideal for demos, manual testing, or quick local setup.

---

## 👨‍💻 Author

**Jonathan Steven Barrantes Jiménez**

---

## 📄 License

Educational/academic use.
