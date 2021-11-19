const express = require("express");
const router = express.Router();
const ADMIN_CONT = require("../controller/admin-controller");

router.post("/admin-create", ADMIN_CONT.adminCreate);

router.get("/admin-list", ADMIN_CONT.adminList);

module.exports = router;
