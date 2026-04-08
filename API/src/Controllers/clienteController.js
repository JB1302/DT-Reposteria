const clienteService = require("../services/clienteService");

class ClienteController {
	async get_all_clientes(req, res) {
		try {
			const clientes = await clienteService.get_all_clientes();
			res.json(clientes);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async get_cliente_by_id(req, res) {
		try {
			const cliente = await clienteService.get_cliente_by_id(req.params.id);
			if (!cliente) {
				return res.status(404).json({ error: "Cliente not found" });
			}
			res.json(cliente);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async create_cliente(req, res) {
		try {
			const cliente = await clienteService.create_cliente(req.body);
			res.status(201).json(cliente);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async update_cliente(req, res) {
		try {
			const cliente = await clienteService.update_cliente(
				req.params.id,
				req.body,
			);
			if (!cliente) {
				return res.status(404).json({ error: "Cliente not found" });
			}
			res.json(cliente);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete_cliente(req, res) {
		try {
			const cliente = await clienteService.delete_cliente(req.params.id);
			if (!cliente) {
				return res.status(404).json({ error: "Cliente not found" });
			}
			res.json({ message: "Cliente deleted" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = new ClienteController();
