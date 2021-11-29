const express = require("express");
const router = express.Router();
const SERVER_CONT = require("../controller/server-controller");

router.post("/server-create", SERVER_CONT.serverCreate);


module.exports = router;
