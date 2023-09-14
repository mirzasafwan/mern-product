const express = require("express");
const { adminData, adminLogin } = require("../controller/adminController");
const router = express.Router();

router.route("/admin").post(adminData);
router.route("/admin/login").post(adminLogin);
module.exports = router;
// router.route("/admin/dashboard").get(getAdminData);
