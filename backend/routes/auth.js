const express = require("express");
const app = express();
const router = express.Router();
const db = require("../config/db");
const userModel = require("../models/user");
const mentorModel = require("../models/mentor");
const studentModel = require("../models/student");

const jwt = require("jsonwebtoken");
const jwtSecret = "myverysec";
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");

const  mentorRouter = require('./mentorRouter');
const studentRouter = require('./studentRouter');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/mentor',mentorRouter)
app.use('/student',studentRouter)


router.post("/register", async (req, res) => {
  try {
    let { name, email, password, confirm_password, role } = req.body;
    if (password !== confirm_password) return res.status(400).json({ message: "Passwords do not match" });

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        user = await userModel.create({
          name:name,
          email,
          password: hash,
          role :role,
        });

        let token = jwt.sign({ email: email, userid: user._id, role: role }, jwtSecret);
        res.status(201).cookie("token", token).json({ message: "User registered successfully", user ,token});       //201 means request was succesful
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong during registration" });      //500 means something went wrong on the server side
  }
});


router.post('/login', async (req, res) => {
    
  let {email,password,role}=req.body
  let user = await userModel.findOne({email});
  if(!user)return res.send("something went wrong");
  bcrypt.compare(password, user.password, async function(err, result) {
    if(result){
      let token = jwt.sign({email:email, userid:user._id,role:role},jwtSecret)

      if (role === "mentor") {
        let mentor = await mentorModel.findOne({ user: user._id });
        if (!mentor) {
          return res.status(200).json({
            userid:user._id,
            message: "Please complete your registration.",
            redirectTo: "/mentor/registration" 
          });
        }
      }
      res.cookie('token', token).status(200).json({ message: "Login successful",
         token,
        role,
      redirectTo: role === "student" ? "/student/profile" : `/mentor/profile/${user._id}`});
     }
    else
     {
      res.status(400).json({ message: "Invalid credentials" });
     } 
  })        
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;