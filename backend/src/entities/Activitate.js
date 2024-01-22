// Tabela Activități:

// ID_activitate (cheie primară, unică pentru fiecare activitate)
// Descriere (text - descrierea activității)
// Data_start (data și ora de început a activității)
// Data_sfarsit (data și ora de încheiere a activității)
// Cod_acces (cod unic pentru accesul la activitate)


import db from "../dbConfig.js";
import {Sequelize} from "sequelize";

const Activitate=db.define("Activitate",{
    ActivitateId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    // ParticipareId:{
    //     type: Sequelize.INTEGER,
    //     allowNull:false
    // },
    DescriereActivitate:{
        type:Sequelize.STRING,
        allowNull:true
    },
    DataActivitate:{
        type: Sequelize.DATE,
        allowNull:false
    },
    CodAcces:{
        type:Sequelize.STRING,
        allowNull:false
    },
    DurataActivitate:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
export default Activitate;
