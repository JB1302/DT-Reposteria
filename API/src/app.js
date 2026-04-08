const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");

const clienteRoutes = require("./Routes/clienteRoutes");
const categoriaRoutes = require("./Routes/categoriaRoutes");
const productoRoutes = require("./Routes/productoRoutes");
const ordenRoutes = require("./Routes/ordenRoutes");

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ordenes", ordenRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
