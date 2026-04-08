const Categoria = require("../Models/categoria");

class CategoriaService {
	async get_all_categorias() {
		return await Categoria.find();
	}

	async get_categoria_by_id(id) {
		return await Categoria.findById(id);
	}

	async create_categoria(data) {
		const categoria = new Categoria(data);
		return await categoria.save();
	}

	async update_categoria(id, data) {
		return await Categoria.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async delete_categoria(id) {
		return await Categoria.findByIdAndDelete(id);
	}
}

module.exports = new CategoriaService();
