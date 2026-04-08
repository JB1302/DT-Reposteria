const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdenSchema = new mongoose.Schema(
	{
		cliente: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "cliente",
			required: true,
		},
		productos: [
			{
				producto: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "producto",
					required: true,
				},
				cantidad: {
					type: Number,
					required: true,
					min: 1,
				},
			},
		],
		cantidadTotal: {
			type: Number,
			required: true,
			min: 1,
		},
		totalPagar: {
			type: mongoose.Schema.Types.Double,
			required: true,
			min: 0,
		},
		estadoOrden: {
			type: String,
			required: true,
			trim: true,
			enum: ["Pendiente", "En preparación", "Lista", "Entregada", "Cancelada"],
		},
		metodoPago: {
			type: String,
			required: true,
			trim: true,
			enum: ["Efectivo", "Sinpe Móvil", "Tarjeta", "Transferencia"],
		},
		observaciones: {
			type: String,
			trim: true,
			default: "",
		},
	},
	{ collection: "ordenes", timestamps: true },
);

module.exports = mongoose.model("orden", OrdenSchema);
