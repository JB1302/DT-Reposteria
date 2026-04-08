const Producto = require("../Models/producto");

class ProductoService {
	async get_all_productos() {
		return await Producto.find().populate("categoria");
	}

	async get_producto_by_id(id) {
		return await Producto.findById(id).populate("categoria");
	}

	async create_producto(data) {
		const producto = new Producto(data);
		return await producto.save();
	}

	async update_producto(id, data) {
		return await Producto.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		}).populate("categoria");
	}

	async delete_producto(id) {
		return await Producto.findByIdAndDelete(id);
	}
}

module.exports = new ProductoService();
