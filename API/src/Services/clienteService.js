const Cliente = require("../Models/cliente");

class ClienteService {
	async get_all_clientes() {
		return await Cliente.find();
	}

	async get_cliente_by_id(id) {
		return await Cliente.findById(id);
	}

	async create_cliente(data) {
		const cliente = new Cliente(data);
		return await cliente.save();
	}

	async update_cliente(id, data) {
		return await Cliente.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async delete_cliente(id) {
		return await Cliente.findByIdAndDelete(id);
	}
}

module.exports = new ClienteService();
