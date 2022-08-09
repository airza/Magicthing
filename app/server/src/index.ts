import {getHash, getProblemWithPasswordOrUsername} from "./user";
const path = require("path");
const express = require('express')
const index = require("./templates/index.pug")
const login = require("./templates/login.pug")
const register = require("./templates/register.pug")
const app = express();
const port = 7777;

app.use(express.urlencoded());
app.use("/static",express.static(path.join(__dirname,'./static'),{
}));
app.get('/', (req, res) => {
    //Check if the user is logged in
    const username = req.query.name ?? "No username???"
    res.send(index({name:username}))
})
app.get('/login',(req, res) => {
    let msg = req.query?.msg ?? "";
    res.send(login({msg}))
})
app.post('/login',(req, res) => {
    const username:String = req.body?.username ?? ""
    const password:String = req.body?.password ?? ""
    let err = getProblemWithPasswordOrUsername(username,password);
    if (err) {
        return res.redirect(`/login?msg=Error: ${err}`);
    } else {
        //try to get the user based on their username and password
        //if we are successful, set their cookie and redirect them to /
        //if we are not successful, redirect them to /login with an appropriate error message
        throw new Error("Not implemented");
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
    }
});
app.listen(7777,'0.0.0.0' ,() => {
    console.log("Up!");
});
