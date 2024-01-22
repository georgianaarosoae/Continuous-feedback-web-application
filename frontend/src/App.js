import './App.css';
import {Routes,Route} from "react-router-dom";
import {routes} from "./routes.js";
import LogIn from './views/LogIn.js';
import NotFound from './views/NotFound.js';
import React,{useState} from "react"
//import ResponsiveAppBar from './components/Menu.js';


function App() {

   //const [userIdentified, setUserIdentified]=useState("")


  return (
    <div className="App">


      {/* <ResponsiveAppBar/> */}
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="/" element={<LogIn Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>




      {/* {<LogIn Login={Login}/>} */}
    </div>
  );
}

export default App;
