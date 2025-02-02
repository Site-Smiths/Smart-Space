const express = require("express");
const app = express();
const userModel = require("./models/user");

const crypto = require("crypto");
const jwtSecret = "myverysec";

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  let { name, email, password, confirm_password } = req.body;

  // if(password !== confirm_password) return res.send("Passwords do not match")

  let user = await userModel.findOne({ email });
  if (user) return res.status(400).send("User already exists");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      user = await userModel.create({
        name,
        email,
        password: hash,
      });
      console.log(user._id);
      let token = jwt.sign({ email: email, userid: user._id },"shh");
      res.cookie("token", token);
      res.render("profile");
    });
  });
});

// login route
app.get('/login', async (req, res) => {
  res.render("login");
})

app.post('/login', async (req, res) => {
    
  let {email,password}=req.body
  let user = await usermodel.findOne({email});
  if(!user)return res.send("something went wrong");
  bcrypt.compare(password, user.password, function(err, result) {
    if(result){
      res.cookie('token', jwt.sign({email:email,userid:user._id},"shhhhhhhhh"));
      res.redirect("/profile");
     }
    else
     {
     res.redirect('/login');
     } 
  })        
});



app.get("/profile/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
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
