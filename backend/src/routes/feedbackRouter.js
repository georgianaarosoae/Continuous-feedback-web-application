import express from "express"
import { createFeedback,deleteFeedback,getFeedback,getFeedbackById } from "../dataAccess/feedbackDa.js";

let feedbackRouter=express.Router();

feedbackRouter.route("/feedback").post(async(req,res)=>{
    return res.json(await createFeedback(req.body))
})

feedbackRouter.route("/feedback/:id").get(async(req,res)=>{
    let id=parseInt(req.params.id)
    return res.json(await getFeedbackById(id))
})

feedbackRouter.route('/feedback').get(async(req,res)=>
{
    return res.json(await getFeedback());
})

feedbackRouter.route("/feedback/:id").delete(async (req,res)=>{ 
    let id=parseInt(req.params.id)
    return res.json(await deleteFeedback(id))
})

export default feedbackRouter;