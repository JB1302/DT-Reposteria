const Orden = require("../Models/orden");
const Cliente = require("../Models/cliente");
const Producto = require("../Models/producto");

class OrdenService {
	async get_all_ordenes() {
		return await Orden.find()
			.populate("cliente")
			.populate("productos.producto");
	}

	async get_orden_by_id(id) {
		return await Orden.findById(id)
			.populate("cliente")
			.populate("productos.producto");
	}

	async create_orden(data) {
		const orden = new Orden(data);
		return await orden.save();
	}

	async update_orden(id, data) {
		return await Orden.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})
			.populate("cliente")
			.populate("productos.producto");
	}

	async delete_orden(id) {
		return await Orden.findByIdAndDelete(id);
	}

	async hacer_pedido(data) {
		const { cliente, productos, metodoPago, observaciones } = data;

		if (!cliente) {
			throw new Error("Cliente is required");
		}

		if (!productos || !Array.isArray(productos) || productos.length === 0) {
			throw new Error("At least one producto is required");
		}

		if (!metodoPago) {
			throw new Error("Metodo de pago is required");
		}

		const clienteExists = await Cliente.findById(cliente);
		if (!clienteExists) {
			throw new Error("Cliente not found");
		}

		let cantidadTotal = 0;
		let totalPagar = 0;

		for (const item of productos) {
			const productoDB = await Producto.findById(item.producto);

			if (!productoDB) {
				throw new Error(`Producto not found: ${item.producto}`);
			}

			if (item.cantidad <= 0) {
				throw new Error(`Invalid cantidad for producto: ${productoDB.nombre}`);
			}

			if (productoDB.stock < item.cantidad) {
				throw new Error(
					`Insufficient stock for producto: ${productoDB.nombre}`,
				);
			}

			cantidadTotal += item.cantidad;
			totalPagar += productoDB.precio * item.cantidad;
		}

		for (const item of productos) {
			const productoDB = await Producto.findById(item.producto);
			productoDB.stock -= item.cantidad;
			await productoDB.save();
		}

		const nuevaOrden = new Orden({
			cliente,
			productos,
			cantidadTotal,
			totalPagar,
			estadoOrden: "Pendiente",
			metodoPago,
			observaciones: observaciones || "",
		});

		await nuevaOrden.save();

		return await Orden.findById(nuevaOrden._id)
			.populate("cliente")
			.populate("productos.producto");
	}
}

module.exports = new OrdenService();
