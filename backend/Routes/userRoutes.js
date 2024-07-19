const express = require("express")
const userController = require("../Controllers/userController")

const router = express.Router()

router.route("/signup")
      .post(userController.signUp)

router.route("/login")
      .post(userController.login)

router.route("/user/profile")
      .get(userController.resourceAccess,userController.getUser)



module.exports = router
      