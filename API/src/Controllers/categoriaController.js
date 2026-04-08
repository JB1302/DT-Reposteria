const categoriaService = require("../services/categoriaService");

class CategoriaController {
	async get_all_categorias(req, res) {
		try {
			const categorias = await categoriaService.get_all_categorias();
			res.json(categorias);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async get_categoria_by_id(req, res) {
		try {
			const categoria = await categoriaService.get_categoria_by_id(
				req.params.id,
			);
			if (!categoria) {
				return res.status(404).json({ error: "Categoria not found" });
			}
			res.json(categoria);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async create_categoria(req, res) {
		try {
			const categoria = await categoriaService.create_categoria(req.body);
			res.status(201).json(categoria);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async update_categoria(req, res) {
		try {
			const categoria = await categoriaService.update_categoria(
				req.params.id,
				req.body,
			);
			if (!categoria) {
				return res.status(404).json({ error: "Categoria not found" });
			}
			res.json(categoria);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete_categoria(req, res) {
		try {
			const categoria = await categoriaService.delete_categoria(req.params.id);
			if (!categoria) {
				return res.status(404).json({ error: "Categoria not found" });
			}
			res.json({ message: "Categoria deleted" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = new CategoriaController();
