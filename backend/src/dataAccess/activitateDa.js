
import Activitate from "../entities/Activitate.js";


async function createActivitate(activitate){
    return await Activitate.create(activitate);
}

async function getActivitateById(id){
    return await Activitate.findByPk(id)
}

async function getActivities(){
    return await Activitate.findAndCountAll()
}

async function deleteActivitate(id){
    let deleteElem=await Activitate.findByPk(id);
    if(!deleteElem){
        console.log("This element does not exist so it cannot be deleted!")
        return
    }
    return await deleteElem.destroy();
}


export {
    createActivitate,
    getActivitateById,
    getActivities,
    deleteActivitate
}