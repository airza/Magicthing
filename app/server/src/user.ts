import {createHmac} from 'crypto';
import * as sqlite3 from 'better-sqlite3';
import { strict as assert } from 'node:assert';
let db = sqlite3('db');
export type User = {
    id:number,
    username:string,
    password_hash:string,
    admin:boolean,
}
export function passwordIsTooShort(password:string):boolean{
    return password.length<8
}
const passwordThatIsLongEnough ="coolpass12222";
assert(passwordIsTooShort("123456789")===false);
assert(passwordIsTooShort("12345678")===false);
assert (passwordIsTooShort("123")===true);
assert (passwordIsTooShort("")===true);

export function getProblemWithPasswordOrUsername(username:string,password:string):string|null{
    if (username.length==0){
        return "Username is empty"
    } else if (password.length<8){
        return "Password must be at least 8 characters"
    } else if (getUserByUsername(username)){
        return "username is taken"
    } else {
        return null;
    }
}
export function getUserByUsernameAndPassword(username:string,password:string):User|null{
    //convert password to hash
    let password_hash = getHash(password);
    //search the db by username and password
    let user = db.prepare("SELECT * FROM user WHERE username=? AND password_hash=?").get(username,password_hash);
    //return the user or undefined
    return user;
}
export function getUserByUsername(username:string):User|null {
    //Search the database for the user with the given username
    //if the user exists, return a User
    //if the user does not exist, return null
    let user = db.prepare("SELECT * FROM user WHERE username=?").get(username)
    return user;
}
export function getHash(password:string):string{
    return createHmac('sha256',"SUPER PASSWORD HASH WOW").update(password).digest('hex');
}

export function makeUser(username,password):User{
    let hash = getHash(password);
    let user = db.prepare("insert into user (username,password_hash,admin) values (?,?,0)").run(username,hash);
    return user;
}