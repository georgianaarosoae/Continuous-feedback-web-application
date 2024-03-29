import mysql from "mysql2/promise.js"
import env from "dotenv"
import Feedback from "./Feedback.js";
import Activitate from "./Activitate.js";
import User from "./User.js";


env.config();

function createDatabase(){
    mysql.createConnection({
        user:process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    })
    .then((connection)=>{
        return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .catch((err)=>{
        console.warn(err.stack)
    })
}

function fkConfig(){
    Feedback.hasMany(User,{as:"Users",foreignKey:"UserId"});
    User.belongsTo(Feedback,{foreignKey:"UserId"})

    User.hasMany(Activitate,{as: "Activitati", foreignKey:"ActivitateId"})
    Activitate.belongsTo(User,{foreignKey:"ActivitateId"})
}

function db_init(){
    createDatabase();
    fkConfig();
}
export default db_init;

//tot este general valabil