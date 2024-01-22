// Tabela Participare:

// ID_participare (cheie primară, unică pentru fiecare înregistrare)
// ID_student (cheie externă către tabela Studenți)
// ID_activitate (cheie externă către tabela Activități)
// Cod_acces_utilizat (codul introdus de student pentru a accesa activitatea)
// Data_acces (data și ora la care studentul a accesat activitatea)



//tabela legatura user si activitati?????????
import db from "../dbConfig.js";
import {Sequelize} from "sequelize";
const Participare=db.define("Participare",{
    ParticipareId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    ActivitateId:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    UserId:{
        type: Sequelize.INTEGER,
        allowNull:false
    } 
})
export default Participare;
//Inutila?????