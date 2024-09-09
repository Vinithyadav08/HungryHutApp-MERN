const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = "vinithcapavagada";

router.post(
  "/createuser",[
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password","Incorrect password").isLength({ min: 5 })],
  async (req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
let userExists = await User.findOne({ email: req.body.email });
if (userExists) {
  return res
    .status(400)
    .json({ success: false, message: "User already exists" });
}

 const salt = await bcrypt.genSalt(10);
 let securePass = await bcrypt.hash(req.body.password, salt);
    try {
     await User.create({
       name: req.body.name,
       password: securePass,
       email: req.body.email,
       location: req.body.location,
     });
     res.json({ success: true });

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Try Logging in with correct credentials",
          });
      }
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password); 
      if (!pwdCompare) {
        return res.status(400).json({
          success: false,
          error: "Try Logging in with correct credentials",
        });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);



module.exports = router;