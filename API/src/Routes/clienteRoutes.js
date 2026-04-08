const express = require("express");
const router = express.Router();
const clienteController = require("../Controllers/clienteController");

router.get("/", clienteController.get_all_clientes);
router.get("/:id", clienteController.get_cliente_by_id);
router.post("/", clienteController.create_cliente);
router.put("/:id", clienteController.update_cliente);
router.delete("/:id", clienteController.delete_cliente);

module.exports = router;
