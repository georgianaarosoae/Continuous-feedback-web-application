import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAxios } from "../api/Calls.js";
import { Alert } from "@mui/material";
import "../App.css";
import "../ParticipareActivitate.css";

function ParticipareActivitate() {
  const [details, setDetails] = useState({ codAcces: "" });
  const [codAcces, setCodAcces] = useState("");
  const [activitatiList, setActivitatiList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const navigate = useNavigate();
  let foundActivity = false;

  const handleInputChange = (e) => {
    setCodAcces(e.target.value);
    
  };
//   useEffect(() => {
//     if (codAcces) {
//       const activitate = activitatiList.find(activitate => activitate.CodAcces === codAcces);
//       if (activitate) {
//         setIdSelected(activitate.ActivitateId);
//       } else {
//         setIdSelected(null);
//       }
//     }
//   }, [codAcces, activitatiList]);

  const participareActivitate = async () => {
    try {
      const response = await getAxios("/activitate");
      console.log("Response from server: ", response);
      const fetchedActivitatiList = response.rows || [];
      setActivitatiList(fetchedActivitatiList);

      

      const activitateLoggedIn = fetchedActivitatiList.find((activitate) => {
        console.log("COD ACCESS", activitate.CodAcces);
        console.log("COD ACCESS Details", codAcces);
        if (activitate.CodAcces == codAcces)
          setIdSelected(activitate.ActivitateId);

        return activitate.CodAcces == codAcces;
      });
      //console.log("ACTIVITYYY", activitateLoggedIn);
      //console.log("ACTIVITYYY IDD", activitateLoggedIn.ActivitateId);
      //setIdSelected(activitateLoggedIn.ActivitateId);

      //console.log("SELECTED IDD", idSelected, "COD ACCES", codAcces);
      if (activitateLoggedIn) {
        console.log("Activity has started!");
        //navigate(`/CreareFeedback/${codAcces}`);
        if (codAcces !== null) {
          navigate(`/CreareFeedback/${activitateLoggedIn.ActivitateId}`);
        }
      } else {
        setShowAlert(true);
        console.log("Activity not found!");
      }
    } catch (error) {
      console.error("Error fetching activity list:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    participareActivitate();
  };

  return (
    <>
      <div>
        <h2>Participare activitate </h2>
        {showAlert && (
          <Alert sx={{ m: 1, width: "25ch" }} severity="error">
            Invalid activity acces code
          </Alert>
        )}
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="accessCode">Cod acces: </label>
          <input
            type="text"
            id="accessCode"
            name="codAcces"
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Acceseaza</button>
      </form>
    </>
  );
}

export default ParticipareActivitate;
