const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		descripcion: {
			type: String,
			required: true,
			trim: true,
		},
		precio: {
			type: Schema.Types.Double,
			required: true,
			min: 0,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		imagen: {
			type: String,
			required: true,
			trim: true,
		},
		categoria: {
			type: Schema.Types.ObjectId,
			ref: "categoria",
			required: true,
		},
	},
	{ collection: "productos", timestamps: true },
);

module.exports = mongoose.model("producto", ProductoSchema);
