const ordenService = require("../Services/ordenService");

class OrdenController {
	async get_all_ordenes(req, res) {
		try {
			const ordenes = await ordenService.get_all_ordenes();
			res.json(ordenes);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async get_orden_by_id(req, res) {
		try {
			const orden = await ordenService.get_orden_by_id(req.params.id);
			if (!orden) {
				return res.status(404).json({ error: "Orden not found" });
			}
			res.json(orden);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async create_orden(req, res) {
		try {
			const orden = await ordenService.create_orden(req.body);
			res.status(201).json(orden);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async update_orden(req, res) {
		try {
			const orden = await ordenService.update_orden(req.params.id, req.body);
			if (!orden) {
				return res.status(404).json({ error: "Orden not found" });
			}
			res.json(orden);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete_orden(req, res) {
		try {
			const orden = await ordenService.delete_orden(req.params.id);
			if (!orden) {
				return res.status(404).json({ error: "Orden not found" });
			}
			res.json({ message: "Orden deleted" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async hacer_pedido(req, res) {
		try {
			const pedido = await ordenService.hacer_pedido(req.body);

			if (!pedido) {
				return res.status(400).json({ error: "Pedido could not be created" });
			}

			res.status(201).json({
				message: "Pedido created successfully",
				pedido,
			});
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = new OrdenController();
