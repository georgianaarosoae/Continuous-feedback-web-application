import React, { useContext, useState, useEffect } from "react";
import IdActivityContext from "../components/ActivitatiGrid.js";
import NestedGrid from "../components/FeedbackGrid.js";
import { getAxios } from "../api/Calls";
import { Container, Box, Typography, Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function VizualizareFeedback() {
  const selectedId = useParams();

  const [activity, setActivity] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const navigate = useNavigate();

  const gasireActivitate = async () => {
    try {
      const response = await getAxios("/activitate");
      const fetchedList = response.rows || [];

      const activity = fetchedList.find((activity) => {
        return activity.ActivitateId == selectedId.id;
      });
      console.log(selectedId);
      if (activity) {
        setActivity(activity);
        console.log(activity);
        console.log("Activity found!");
      } else {
        console.log("Activity not found!");
      }
    } catch (error) {
      console.error("Error fetching list", error);
    }
  };

  const afisareFeedback = async () => {
    try {
      const response = await getAxios("/feedback");
      const fetchedList = response.rows || [];

      const feedback = fetchedList.find((feedback) => {
        console.log("ID FEEDBACK", feedback);
        console.log("ID SELECTED", selectedId.id);
        return feedback.ActivitateId == selectedId.id;
      });
      if (feedback) {
        setFeedback(feedback);
        console.log("Feedback found!");
      } else {
        setShowAlert(true);
        console.log("Feedback not found!");
      }
    } catch (error) {
      console.error("Error fetching list", error);
    }
  };

  useEffect(() => {
    gasireActivitate();
    afisareFeedback();
  }, []);

  function handleOnBtnClick() {
    navigate("/Home");
  }

  useEffect(() => {
    const timpActual = Date.now();
    const dataSiOraActivitate = new Date(activity.DataActivitate).getTime();
    const durataActivitate = activity.DurataActivitate * 60 * 1000;

    if (timpActual >= dataSiOraActivitate + durataActivitate) {
      setStatus("Expirată");
    } else if (timpActual >= dataSiOraActivitate) {
      setStatus("Activă");
    } else {
      setStatus("Urmează");
    }
  }, [activity]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div 
      style={{
        position:"absolute",
        top:"15px",
        left:"10px",
        border:"1 px solid #000",
        padding:"3px",
        borderRadius:"3px",
        backgroundColor:"#fff"

      }}>
        <Button onClick={handleOnBtnClick}>Go back to activities board!</Button>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h5">{activity.DescriereActivitate}</Typography>
        <Typography variant="h6">
          Data activitate: {activity.DataActivitate}
        </Typography>
        <Typography variant="bold">
          Durata: {activity.DurataActivitate} minute
        </Typography>
        <Typography
          variant="bold"
          color={
            status === "Activă"
              ? "#00FF00"
              : status === "Urmează"
              ? "#6A5ACD"
              : "error"
          }
        >
          {status}
        </Typography>
      </Box>

      {showAlert && <Alert severity="info">No feedback found!</Alert>}
      <NestedGrid></NestedGrid>
    </Container>
  );
}
export default VizualizareFeedback;
