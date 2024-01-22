import React, { useState, useEffect, createContext, useContext } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { getAxios } from "../api/Calls";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const IdActivitateContext = createContext();

function RowAndColumnSpacing() {
  const [activityList, setActivityList] = useState([]);
  const [idSelected, setIdSelected] = useState(null);
  const navigate = useNavigate();

  const handleOnClick = (activityId) => {
    setIdSelected(activityId);
    console.log("IDDDD", idSelected);
    if (idSelected !== null) {
        navigate(`/VizualizareFeedback/${idSelected}`);
      }
  };

  const activitatiBD = async () => {
    try {
      const response = await getAxios("/activitate");
      const fetchedList = response.rows || [];
      setActivityList(fetchedList);
      console.log("ACTIVITATI GRID",activityList)
      if (activityList.length>0) {
        console.log("Activities showed");
      } else {
        console.log("Activities not showed!");
      }
    } catch (error) {
      console.error("Error fetching activity list:", error);
    }
  };


useEffect(() => {
    activitatiBD();
    // console.log("Updated ID:", idSelected);
    // if (idSelected !== null) {
    //   navigate("/VizualizareFeedback");
    // }
  }, []);
  

  return (
    <IdActivitateContext.Provider value={idSelected}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {activityList.map((activity, index) => (
            <Grid
              key={index}
              xs={5}
              onClick={() => handleOnClick(activity.ActivitateId)}
            >
              <Item >{activity.DescriereActivitate}</Item>
              <Item >Durata: {activity.DurataActivitate} minute</Item>
              <Item >Data: {activity.DataActivitate}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </IdActivitateContext.Provider>
  );
}

export default RowAndColumnSpacing;
