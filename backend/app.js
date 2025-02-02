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

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  let { name, email, password, confirm_password,role} = req.body;

  if(password !== confirm_password) return res.send("Passwords do not match")

  let user = await userModel.findOne({ email });
  if (user) return res.status(400).send("User already exists");



  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      user = await userModel.create({
        name,
        email,
        password: hash,
        role,
      });
      let token = jwt.sign({ email: email, userid: user._id ,role: role},"shh");
      res.cookie("token", token);

      if(role === "student") {
        res.redirect("/student/profile");
      }
      else if(role === "mentor") {  
        res.redirect(`/mentor/register/${user._id}`);
      }
    });

  });
});

// login route
app.get('/login', async (req, res) => {
  res.render("login");
})

app.post('/login', async (req, res) => {
    
  let {email,password,role}=req.body
  let user = await userModel.findOne({email});
  if(!user)return res.send("something went wrong");
  bcrypt.compare(password, user.password, async function(err, result) {
    if(result){
      res.cookie('token', jwt.sign({email:email,userid:user._id},"shhhhhhhhh"));
      if(role === "student") {
        res.redirect("/student/profile");
      }
      else if(role === "mentor") {  
        let mentor = await mentorModel.findOne({user:user._id});
        res.redirect(`/mentor/profile/${mentor._id}`);
      }
     }
    else
     {
     res.redirect('/login');
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
