
import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

// Tabela Feedback:

// ID_feedback (cheie primară, unică pentru fiecare feedback)
// ID_student (cheie externă către tabela Studenți)
// ID_activitate (cheie externă către tabela Activități)
// Emoticon (tipul de reacție - poate fi reprezentat prin numere sau coduri)
// Data_feedback (data și ora la care a fost acordat feedback-ul)

const Feedback=db.define("Feedback",{
    FeedbackId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    UserId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Emoticon:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    DataFeedback:{
        type: Sequelize.DATE,
        allowNull:false
    },
    DescriereFeedback:{
        type:Sequelize.STRING,
        allowNull:true
    },
    ActivitateId:{
        type:Sequelize.INTEGER,
        allowNull:true
    }

})

export default Feedback;