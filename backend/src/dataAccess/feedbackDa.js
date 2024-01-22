
import Feedback from "../entities/Feedback.js"
import User from "../entities/User.js"


async function createFeedback(feedback){
    return await Feedback.create(feedback,{include:[{model: User, as: "Users"}]});
}

async function getFeedbackById(id){
    return await Feedback.findByPk(id,{include:"Users" })
}

async function getFeedback(){
    return await Feedback.findAndCountAll();
}

async function deleteFeedback(id){
    let deleteElem=await Feedback.findByPk(id);
    if(!deleteElem){
        console.log("This element does not exist so it cannot be deleted!")
        return
    }
    return await deleteElem.destroy();
}


export {
   createFeedback,
   deleteFeedback,
   getFeedback,
   getFeedbackById
}