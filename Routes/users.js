const router = require("express").Router();
const userController = require("../Controllers/userController");



router.post("/signin", userController.userSignIn);
router.post("/signup", userController.userSignUp);


module.exports = router;