const productoService = require("../services/productoService");

class ProductoController {
	async get_all_productos(req, res) {
		try {
			const productos = await productoService.get_all_productos();
			res.json(productos);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async get_producto_by_id(req, res) {
		try {
			const producto = await productoService.get_producto_by_id(req.params.id);
			if (!producto) {
				return res.status(404).json({ error: "Producto not found" });
			}
			res.json(producto);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async create_producto(req, res) {
		try {
			const producto = await productoService.create_producto(req.body);
			res.status(201).json(producto);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async update_producto(req, res) {
		try {
			const producto = await productoService.update_producto(
				req.params.id,
				req.body,
			);
			if (!producto) {
				return res.status(404).json({ error: "Producto not found" });
			}
			res.json(producto);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete_producto(req, res) {
		try {
			const producto = await productoService.delete_producto(req.params.id);
			if (!producto) {
				return res.status(404).json({ error: "Producto not found" });
			}
			res.json({ message: "Producto deleted" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = new ProductoController();
