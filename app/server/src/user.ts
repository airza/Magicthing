import {createHmac} from 'crypto';
import * as sqlite3 from 'better-sqlite3';
let db = sqlite3('db');
export type User = {
    id:number,
    username:string,
    hash:string,
    admin:boolean,
}
export function getProblemWithPasswordOrUsername(username,password):string|null{
    if (username.length==0){
        return "Username is empty"
    } else if (password.length>8){
        return "Password must be at least 8 characters"
    } else {
        return null;
    }
}
export function getUserByUsername(username:string):User|null{
    return null;
    //Search the database for the user with the given username
    //if the user exists, return a User
    //if the user does not exist, return null
}
export function getHash(password:string):string{
    return createHmac('sha256',"SUPER PASSWORD HASH WOW").update(password).digest('hex');
}
export function login(username:string,password:string):User|null{
    let hash = getHash(password);
    let user = db.prepare("select * from user where username=? and password_hash=?").get(username,hash);
    if (user){
        return {
            id:user.id,
            username:user.username,
            hash:user.password_hash,
            admin:user.admin
        }
    } else {
        return null;
    }
}
export function makeUser(username,password):User{
    let hash = getHash(password);
    let user = db.prepare("insert into user (username,password_hash,admin) values (?,?,0)").run(username,hash);
    return {
        id:user.lastInsertRowid,
        username:username,
        hash:hash,
        admin:false
    }
}