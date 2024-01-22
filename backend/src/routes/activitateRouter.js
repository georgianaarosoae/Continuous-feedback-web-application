import express from "express"
import { createActivitate,getActivitateById,getActivities,deleteActivitate } from "../dataAccess/activitateDa.js";

let activitateRouter=express.Router();

activitateRouter.route("/activitate").post(async(req,res)=>{
    const body=req.body
    if(!body) return res.status(500).json({message:" BODY MISSING"})
    try{
    const newActivity=await createActivitate(body);
    return res.status(200).json(newActivity)
    }catch(error){
        return res.status(500).json({message:"ERORR", error:error})
    }
})

activitateRouter.route("/activitate/:id").get(async(req,res)=>{
    let id=parseInt(req.params.id)
    return res.json(await getActivitateById(id))
})

activitateRouter.route('/activitate').get(async(req,res)=>
{
    return res.json(await getActivities());
})

activitateRouter.route("/activitate/:id").delete(async (req,res)=>{ 
    let id=parseInt(req.params.id)
    return res.json(await deleteActivitate(id))
})

export default activitateRouter;