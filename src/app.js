const express = require('express');
const path = require('path');
const app = express();
require("./connect/conn");

const Register = require("./mon/register")
const hbs = require('hbs');
const port = process.env.PORT || 4022;


const imgs_path = path.join(__dirname, "../imgs");
const css_path = path.join(__dirname, "../css");


const static_path = path.join(__dirname, "../public");

const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");
app.use(express.static(static_path));
app.use(express.static(imgs_path));

app.use(express.static(css_path));

app.use(express.json());
app.use(express.urlencoded({ extended:false }));


app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.use(express.static(__dirname + '/imgs'));


app.get("/", (req,res) =>{
    res.render("index");
});
app.get("/register.hbs", (req,res) =>{
    res.render("register");
})
app.get("/login.hbs", (req,res) =>{
    res.render("login");
})

app.post("/register.hbs", async (req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){

            const registerEmployee = new Register({
                email : req.body.email, 
                password: req.body.password,
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                confirmpassword:req.body.confirmpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("password is incorrect");
        }
        console.log(req.body.register);

    } catch (err) {
        res.status(400).send(err);

}});
app.post("/login.hbs", async (req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

       const useremail = await Register.findOne({ email: email});
       if(useremail.password === password){
        res.status(200).render("home");
       }else{
        res.send("Invalid Credentials");
       }
    } catch (err) {
        res.status(400).send("invalid email");

}});

app.listen(port, () =>{
    console.log(`server is running on http://localhost:${port}`);
})