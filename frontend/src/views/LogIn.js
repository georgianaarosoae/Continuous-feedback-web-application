import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import {Alert} from "@mui/material";
import { getAxios} from "../api/Calls.js";

function LogIn() {
const [details, setDetails] = useState({ email: "", password: "", isTeacher: false });
const [error, setError] = useState("");
const [userList, setUserList] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const navigate = useNavigate();

const handleRedirect = () => {
    if (details.isTeacher) {
    navigate('./CreareActivitate');
    }else{
        navigate('./ParticipareActivitate')
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
};

const handleRadioChange = (e) => {
    const { name, checked } = e.target;
    setDetails({ ...details, [name]: checked });
};

const Login = async (details) => {
    try {
    const response = await getAxios("/user");
    console.log("Response from server:", response);
    console.log("DETAILS from server:", details);
    const fetchedUserList = response.rows || [];
    setUserList(fetchedUserList);

    console.log(fetchedUserList);
    const userLoggedIn = fetchedUserList.find(
        (user) =>{
        return user.Email == details.email && user.Password == details.password &&user.IsTeacher==details.isTeacher
        }
    );
    
    if (userLoggedIn) {
        handleRedirect();
        console.log("Logged in");
    } else {
        setShowAlert(true);
        console.log("Not logged in");
    }
    } catch (error) {
        setShowAlert(true);
        console.error("Error fetching user list:", error);
    }
};

const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
};

return (
    <form onSubmit={submitHandler}>
        
    <div className="form-inner">
        <h2>Login</h2>
        {showAlert&& (
            <Alert sx={{ m: 1, width: "25ch" }} severity="error">
            Invalid credentials
            </Alert>
        )}
        <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input
            type="text"
            name="email"
            id="email"
            onChange={handleInputChange}
        ></input>
        </div>

        <div className="form-group">
        <label htmlFor="password">Password: </label>
        <input
            type="text"
            name="password"
            id="password"
            onChange={handleInputChange}
        ></input>
        </div>

        <div className="form-group">
        <div><label>
            Are you a teacher?
            <input
            type="radio"
            name="isTeacher"
            value="true"
            onChange={handleRadioChange}
            />{" "}
            Yes
        </label></div>
        <div>
        <label>
            <input
            type="radio"
            name="isTeacher"
            value="false"
            onChange={handleRadioChange}
            defaultChecked
            />{" "}
            No
        </label>
        </div>
        </div>

        <input type="submit" value="LOGIN"></input>
    </div>
    </form>
);
}


export default LogIn;
