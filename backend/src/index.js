import express from "express"
import env from "dotenv"
import cors from "cors"
import db_init from "./entities/db_init.js"
import masterRouter from "./routes/masterRoute.js"
import userRouter from "./routes/userRouter.js"
import feedbackRouter from "./routes/feedbackRouter.js"
import activitateRouter from "./routes/activitateRouter.js"



// ./ director curent si ../ director parinte
env.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

const corsOptions={
    origin:"http://localhost:3000",
    methods:'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

db_init();

app.use("/api",masterRouter)
app.use("/api",userRouter)
app.use("/api",feedbackRouter)
app.use("/api",activitateRouter)


const port=process.env.PORT||8001;
app.listen(port);
console.log("API is running at "+port);

//tot ce e mai sus, e general valabil