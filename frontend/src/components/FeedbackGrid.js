import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import IdActivityContext from "../components/ActivitatiGrid.js";
import { getAxios } from "../api/Calls";
import {useParams} from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function NestedGrid() {
  const selectedId = useParams();
  const [feedbackList, setFeedbackList] = useState([]);

  const afisareFeedback = async () => {
    try {
      const response = await getAxios("/feedback");
      const fetchedList = response.rows || [];

      console.log("Selected id", selectedId.id);

      const filteredFeedbackList = fetchedList.filter(
       
        (feedback) => {
          console.log("IUHU",feedback.ActivitateId);
          console.log("YEYY",selectedId.id);
          return feedback.ActivitateId == selectedId.id;
        }
      );
      console.log("LISTA MEA",filteredFeedbackList)
      setFeedbackList(filteredFeedbackList);
      if (filteredFeedbackList.length > 0) {
        //console.log(filteredFeedbackList);
        console.log("List found!");
      } else {
        console.log("List not found!");
      }
    } catch (error) {
      console.error("Error fetching list", error);
    }
  };
  useEffect(() => {
    afisareFeedback();
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {feedbackList && feedbackList.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {feedbackList.map((feedback, index) => (
            <Item
              key={index}
              sx={{
                width: "200px",
                height: "150px",
                backgroundColor: "#fff",
                margin: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                color: feedback.Emoticon === "happy" ? "#BA55D3" : "inherit",
              }}
            >
              <div>
                <p>Feedback descriere: {feedback.DescriereFeedback}</p>
              </div>
              <div>
                <p>Emoticon: {feedback.Emoticon}</p>
                <p>Data si ora: {feedback.DataFeedback}</p>
                {feedback.Links && (
                  <ul>
                    {feedback.Links.map((link, linkIndex) => (
                      <li key={linkIndex}>{link}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Item>
          ))}
        </Box>
       )}
       </Container>
  );
}

export default NestedGrid;
