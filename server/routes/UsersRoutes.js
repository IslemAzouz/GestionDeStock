const express = require("express");
const router = express.Router();
const User = require("../controllers/Users");

router.get("/getall", User.getAllUsers);
router.get("/get/:id", User.getUserById);
router.put("/update/:id", User.updateUser);
router.delete("/delete/:id", User.deleteUser);


module.exports = router;