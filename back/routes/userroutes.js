const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.route("/create").post(usercontroller.create);
router.route("/getusers").get(usercontroller.getusers);
router.route("/finduser").post(usercontroller.finduser);
router.route("/updateuser").post(usercontroller.updateuser);
router.route("/delete/:username").delete(usercontroller.delete);
module.exports = router;
