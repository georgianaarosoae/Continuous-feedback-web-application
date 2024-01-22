
import db from "../dbConfig.js";
import {Sequelize} from "sequelize";

const User=db.define("User",{
    UserId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    UserName:{
        type: Sequelize.STRING,
        allowNull:false
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    IsTeacher:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    ActivitateId:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})
export default User;