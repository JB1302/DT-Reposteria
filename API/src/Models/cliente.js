const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
	{
		// Datos del cliente
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		apellido: {
			type: String,
			required: true,
			trim: true,
		},
		telefono: {
			type: String,
			required: true,
			trim: true,
		},
		correo: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		direccion: {
			type: String,
			required: true,
			trim: true,
		},
		activo: {
			type: Boolean,
			default: true,
		},
	},
	// Collection
	{ collection: "clientes", timestamps: true },
);

module.exports = mongoose.model("cliente", ClienteSchema);
