const express = require("express");
const app = express();
const db = require("./config/db");
const userModel = require("./models/user");
const mentorModel = require("./models/mentor");
const studentModel = require("./models/student");

const crypto = require("crypto");
const jwtSecret = "myverysec";
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

const  mentorRouter = require('./routes/mentorRouter');
const studentRouter = require('./routes/studentRouter');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/mentor',mentorRouter)
app.use('/student',studentRouter)

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3001",  
  methods: "GET,POST",
  credentials: true, 
}));

// app.get("/", (req, res) => {
//   res.render("register");
// });

app.post("/register", async (req, res) => {
  try {
    let { name, email, password, confirm_password, role } = req.body;
    if (password !== confirm_password) return res.status(400).json({ message: "Passwords do not match" });

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        user = await userModel.create({
          name,
          email,
          password: hash,
          role,
        });

        let token = jwt.sign({ email: email, userid: user._id, role: role }, "shh");
        res.status(201).cookie("token", token).json({ message: "User registered successfully", user });       //201 means request was succesful
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong during registration" });      //500 means something went wrong on the server side
  }
});


// login route
// app.get('/login', async (req, res) => {
//   res.render("login");
// })

app.post('/login', async (req, res) => {
    
  let {email,password,role}=req.body
  let user = await userModel.findOne({email});
  if(!user)return res.send("something went wrong");
  bcrypt.compare(password, user.password, async function(err, result) {
    if(result){
      let token = jwt.sign({email:email, userid:user._id,role:role},"shhh")

      if (role === "mentor") {
        let mentor = await mentorModel.findOne({ user: user._id });
        if (!mentor) {
          return res.status(200).json({
            message: "Please complete your registration.",
            redirectTo: "/mentor/registration" 
          });
        }
      }
      res.cookie('token', token, { httpOnly: true }).status(200).json({ message: "Login successful",
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

function isLoggedIn(req, res, next) {
  let token = req.cookies.token;
  if (!token) return res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shh");
    req.user = data;
  }
  next();
}

app.listen(3000);
