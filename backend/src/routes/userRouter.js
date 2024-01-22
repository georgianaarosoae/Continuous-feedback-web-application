import express from "express"
import userFilterDto from "../dataAccess/models/userFilterDto.js"
import { createUser,deleteUser,getUsers, getUserById } from "../dataAccess/userDa.js";

let userRouter=express.Router();

userRouter.route("/user").post(async(req,res)=>{
    return res.json(await createUser(req.body))
})

userRouter.route("/user/:id").get(async(req,res)=>{
    let id=parseInt(req.params.id)
    return res.json(await getUserById(id))
})

userRouter.route('/user').get(async(req,res)=>
{
    var queryParams=new userFilterDto(req.query);
    return res.json(await getUsers(queryParams));
})

userRouter.route("/user/:id").delete(async (req,res)=>{ 
    let id=parseInt(req.params.id)
    return res.json(await deleteUser(id))
})

export default userRouter;