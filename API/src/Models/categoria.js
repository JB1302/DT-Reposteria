const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
	{
		// Datos de la categoría
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		categoria: {
			type: String,
			required: true,
			trim: true,
		},
		descripcion: {
			type: String,
			required: true,
			trim: true,
		},
		estado: {
			type: Boolean,
			default: true,
		},
	},
	// Collection
	{ collection: "categorias", timestamps: true },
);

module.exports = mongoose.model("categoria", CategoriaSchema);
