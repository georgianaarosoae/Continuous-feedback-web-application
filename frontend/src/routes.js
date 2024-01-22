import CreareActivitate from "./views/CreareActivitate.js";
import CreareFeedback from "./views/CreareFeedback.js";
import VizualizareFeedback from "./views/VizualizareFeedback.js";
// import FeedbackEdit from "./views/FeedbackEdit.js";
import LogIn from "./views/LogIn.js";
import NotFound from "./views/NotFound.js";
import ParticipareActivitate from "./views/ParticipareActivitate.js";
import Home from "./views/Home.js";
//import AddBoxIcon from '@mui/icons-material/AddBox';


export const routes=Object.freeze([
    {
        path:"/",
        component: LogIn,
        name:"LogIn",
    },
    {
        path:"*",
        component: NotFound,
        name:null,
    },
    {
        path:"/CreareActivitate",
        component: CreareActivitate,
        name:"CreareActivitate",
    },
    {
        path:"/CreareFeedback/:id",
        component: CreareFeedback,
        name:"CreareFeedback",
    },
    {
        path:"/ParticipareActivitate",
        component: ParticipareActivitate,
        name:"ParticipareActivitate",
    },
    {
        path:"/VizualizareFeedback/:id",
        component: VizualizareFeedback,
        name:"VizualizareFeedback",
    },
    {
        path:"/Home",
        component: Home,
        name:"Home",
    },
    // {
    //     path:"/NewFeedback",
    //     component: FeedbackEdit,
    //     name:null,
    // },
    // {
    //     path:"/EditFeedback/:id",
    //     component: FeedbackEdit,
    //     name:null,
    // }
]);

