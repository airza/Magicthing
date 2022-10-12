import {getProblemWithPasswordOrUsername, getUserByUsernameAndPassword, makeUser} from "./user";
import cookieParser = require("cookie-parser");
const path = require("path");
const express = require('express')
const index = require("./templates/index.pug")
const login = require("./templates/login.pug")
const register = require("./templates/register.pug")
const app = express();
const port = 7777;
const secret = "Funkle Cunkle";
app.use(express.urlencoded());
app.use(cookieParser(secret));
app.use("/static",express.static(path.join(__dirname,'./static'),{
}));
app.get('/', (req, res) => {
    if (!req.signedCookies.user) {
        return res.redirect("/login");
    } else{
        return res.redirect ("/home")
    }

})
app.get('/home', (req, res) => {
    res.send(index(req.user));
});
app.get('/login',(req, res) => {
    let msg = req.query?.msg ?? "";
    res.send(login({msg}))
})
app.post('/login',(req, res) => {
    const username:string = req.body?.username ?? ""
    const password:string = req.body?.password ?? ""
    let user = getUserByUsernameAndPassword(username,password);
    if (!user) {
        return res.redirect(`/login?msg=Login failed`);
    } else {
        res.cookie("user",username,{signed:true,httpOnly:true});
        //try to get the user based on their username and password
        //if we are successful, set their cookie and redirect them to /
        //if we are not successful, redirect them to /login with an appropriate error message
        return res.redirect("/");
    }
})
app.get("/register",(req, res) => {
    let msg = req.query?.msg ?? "";
    res.send(register({msg}));
});

app.post("/register",(req, res) => {
    const username:string = req.body?.username ?? "";
    const password:string = req.body?.password ?? "";
    let err = getProblemWithPasswordOrUsername(username,password);
    if (err){
        return res.redirect(`/register?msg=${err}`);
    } else {
        makeUser(username,password);
        return res.send("made user:" + username);
    }
});
app.listen(7777,'0.0.0.0' ,() => {
    console.log("Up!");
});