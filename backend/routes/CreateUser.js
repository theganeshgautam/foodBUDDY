const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "IamJoseMourinho"

router.post('/createuser',[
  body('email').isEmail(),
  body('name').isLength({min:5}),
  body('password', 'invalid password').isLength({min:5})],
  async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
  try{
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    })

    res.json({success:true});
  }catch(error){
    console.log(error);
    res.json({success:false});
  }
})

router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min:5 })],
  async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }
    let email =req.body.email;
    try{
      let userData= await User.findOne({email});

      if(!userData){
        return res.status(400).json({errors: "Try logging with correct credentials "})
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if(!pwdCompare){
        return res.status(400).json({errors: "Try logging with correct password"})
      }

      const data ={
        ouser:{
          id:userData.id
        }
      }

      const authToken= jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken:authToken})
    }catch(error){
      console.log(error)
      res.json({ success: false });
    }
  }
)

module.exports = router;






















// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');
// // const bcrypt = require('bcryptjs');

// router.post('/createuser', [
//   body('email', 'Invalid email').isEmail(),
//   body('name', 'Name should be at least 5 characters long').isLength({ min: 5 }),
//   body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })
// ], async (req, res) => {
//   // Validate input
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   try {
//     // Check for existing user
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }

//     // Hash the password
//     // const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     console.log(req.body);
//     // Create a new user
//     const newUser = await User.create({
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email,
//       location: req.body.location
//     });

//     res.json({ success: true, userId: newUser.id });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// module.exports = router;
