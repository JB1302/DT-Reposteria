const express = require("express");
const router = express.Router();
const ordenController = require("../Controllers/ordenController");

router.get("/", ordenController.get_all_ordenes);
router.get("/:id", ordenController.get_orden_by_id);
router.post("/", ordenController.create_orden);
router.post("/hacer-pedido", ordenController.hacer_pedido);
router.put("/:id", ordenController.update_orden);
router.delete("/:id", ordenController.delete_orden);

module.exports = router;
