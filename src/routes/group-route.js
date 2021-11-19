const express = require("express");
const router = express.Router();
const GROUP_CONT = require("../controller/group-controller");

router.post("/group-create", GROUP_CONT.groupCreate);

router.get("/group-list", GROUP_CONT.groupList);

module.exports = router;
