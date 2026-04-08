const express = require("express");
const router = express.Router();
const categoriaController = require("../Controllers/categoriaController");

router.get("/", categoriaController.get_all_categorias);
router.get("/:id", categoriaController.get_categoria_by_id);
router.post("/", categoriaController.create_categoria);
router.put("/:id", categoriaController.update_categoria);
router.delete("/:id", categoriaController.delete_categoria);

module.exports = router;
