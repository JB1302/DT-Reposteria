const express = require("express");
const router = express.Router();
const productoController = require("../Controllers/productoController");

router.get("/", productoController.get_all_productos);
router.get("/:id", productoController.get_producto_by_id);
router.post("/", productoController.create_producto);
router.put("/:id", productoController.update_producto);
router.delete("/:id", productoController.delete_producto);

module.exports = router;
