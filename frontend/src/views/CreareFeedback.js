import { getAxios, postAxios, putAxios, removeAxios } from "../api/Calls.js";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import "../css/CreareFeedback.css";
import { Box, Container, Typography } from "@mui/material";
import {useParams} from 'react-router-dom';

function CreareFeedback() {
  const [details, setDetails] = useState({
    descriereActivitate: "",
    dataActivitate: "",
    durataActivitate: "",
  });
  const [activitateList, setActivitateList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [descriereFeedback, setDescriereFeedback] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [notNullFeedback, setNotNullFeedback] = useState(false);
  const navigate = useNavigate();
  const idSelected=useParams();

  const handleDescriereFeedbackChange = (e) => {
    setDescriereFeedback(e.target.value);
  };
  
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const [activity, setActivity] = useState("");

  const afiseazaActivitate = async () => {
    try {
      const response = await getAxios("/activitate");
      console.log("Response from server:", response);
      const fetchedActivitateList = response.rows || [];
      setActivitateList(fetchedActivitateList);

      const activityFound = fetchedActivitateList.find((activity) => {
        return activity.ActivitateId == idSelected.id;
      });
      console.log("ACTIVITY FOUND", activityFound);
      setActivity(activityFound);

      if (activityFound) {
        const updatedDetails = { ...details };
        updatedDetails.descriereActivitate = activityFound.descriereActivitate;
        updatedDetails.dataActivitate = activityFound.dataActivitate;
        updatedDetails.durataActivitate = activityFound.durataActivitate;
        console.log("Activity found!");
      } else {
        console.log("Activity is not found!");
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const trimiteFeedback = async (details) => {
    try {
      const feedbackDetails = {
        UserId: 2,
        Emoticon: selectedEmoji,
        DataFeedback: new Date().toISOString().slice(0, 19).replace("T", " "),
        DescriereFeedback: descriereFeedback,
        ActivitateId: idSelected.id
      };
      if (descriereFeedback.trim() !== "" && selectedEmoji !== "") {
        setNotNullFeedback(true);
        const response = await postAxios("/feedback", feedbackDetails);
        console.log("Response from server:", response);
        const fetchedFeedbackList = response.rows || [];
        setFeedbackList(fetchedFeedbackList);

        if (fetchedFeedbackList) {
          console.log("Feedback is showed!");
        } else {
          console.log("Feedback is not showed!");
        }
      } else {
        console.log("Descriere feedback sau emoticonul este gol!");
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    afiseazaActivitate();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (descriereFeedback.trim() !== "" && selectedEmoji !== "") {
      await trimiteFeedback();
      setShowMsg(true);
      setDescriereFeedback("");
      setSelectedEmoji("");
    } else {
      console.log("Descriere feedback sau emoticonul este gol!");
      setShowMsg(false);
    }
  };

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
        <Typography variant="h5">Detaliile activitatii:</Typography>
        <Typography variant="h5"> {activity && activity.DescriereActivitate ? activity.DescriereActivitate : "No activity description"}</Typography>
        <Typography variant="bold">
          Data activitatii: {activity.DataActivitate}
        </Typography>
        <Typography variant="bold">
          Durata: {activity.DurataActivitate} minute
        </Typography>
      </Box>

      <h1>Creare feedback</h1>
      <div className="emoji-grid">
        <div
          className={`emoji-box ${selectedEmoji === "happy" ? "selected" : ""}`}
          onClick={() => handleEmojiClick("happy")}
        >
          <span role="img" aria-label="happy" className="emoji">
            😀
          </span>
        </div>
        <div
          className={`emoji-box ${selectedEmoji === "sad" ? "selected" : ""}`}
          onClick={() => handleEmojiClick("sad")}
        >
          <span role="img" aria-label="sad" className="emoji">
            😞
          </span>
        </div>
        <div
          className={`emoji-box ${
            selectedEmoji === "confused" ? "selected" : ""
          }`}
          onClick={() => handleEmojiClick("confused")}
        >
          <span role="img" aria-label="confused" className="emoji">
            😕
          </span>
        </div>
        <div
          className={`emoji-box ${
            selectedEmoji === "disgusted" ? "selected" : ""
          }`}
          onClick={() => handleEmojiClick("disgusted")}
        >
          <span role="img" aria-label="disgusted" className="emoji">
            🤢
          </span>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="feedbackText">Scrie feedback pentru activitate: </label>
          <input
            type="text"
            name="feedbackText"
            id="feedbackText"
            onChange={handleDescriereFeedbackChange}
          />
        </div>
        <div className="button-container">
          <input
            type="submit"
            value="TRIMITE FEEDBACK"
            className="styled-button"
          />
        </div>
        {showMsg && (
          <Alert sx={{ m: 1, width: "25ch" }} severity="success">
            Feedback trimis!
          </Alert>
        )}
      </form>
    </Container>
  );
}

export default CreareFeedback;
