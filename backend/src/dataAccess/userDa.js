
import User from "../entities/User.js"
import Activitate from "../entities/Activitate.js"
import userFilterDto from "./models/userFilterDto.js";


async function createUser(user){
    return await User.create(user,{include:[{model: Activitate, as: "Activitati"}]});
}

async function getUserById(id){
    return await User.findByPk(id,{include:"Activitati" })
}

async function getUsers(userFilterDto){
    if(!userFilterDto.take) userFilterDto.take=10;

    if(!userFilterDto.skip) userFilterDto.skip=0;

    let whereClause={}

    if(userFilterDto.userName){
        whereClause.userName={[Like]: `%${userFilterDto.userName}%`}
    }

    if(userFilterDto.email){
        whereClause.email={[Like]: `%${userFilterDto.email}%`};
    }

    return await User.findAndCountAll({
        distinct:true,
        where: whereClause,
        limit: userFilterDto.take,
        offset:userFilterDto.skip*userFilterDto.take
    })
}

async function deleteUser(id){
    let deleteElem=await User.findByPk(id);
    if(!deleteElem){
        console.log("This element does not exist so it cannot be deleted!")
        return
    }
    return await deleteElem.destroy();
}


export {
    createUser,
    getUserById,
    getUsers,
    deleteUser
}