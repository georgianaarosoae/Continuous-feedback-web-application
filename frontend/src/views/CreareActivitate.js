import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAxios, postAxios } from '../api/Calls.js';
import { Alert,Button } from "@mui/material";

function CreareActivitate() {
    const [descriereActivitate, setDescriereActivitate] = useState('');
    const [dataActivitate, setDataActivitate] = useState('');
    const [codAcces, setCodAcces] = useState('');
    const [durataActivitate, setDurataActivitate] = useState('');
    const [activitiesList, setActivitiesList] = useState('');
    const navigate = useNavigate();

    const handleDescriereActivitateChange = (e) => {
        setDescriereActivitate(e.target.value);
        console.log("decsriereee",descriereActivitate)
    };

    const handleDataActivitateChange = (e) => {
        setDataActivitate(e.target.value);
        console.log("data",dataActivitate)
    };

    const handleCodAccesChange = (e) => {
        setCodAcces(e.target.value);
    };

    const handleDurataActivitateChange = (e) => {
        setDurataActivitate(e.target.value);
    };



    const creazaActivitate=async ()=>{
        try{
            const activitateDetails={
                DescriereActivitate:descriereActivitate,
                DataActivitate:dataActivitate,
                CodAcces:codAcces,
                DurataActivitate:durataActivitate
            };
            
            const response=await postAxios("/activitate", activitateDetails);
            console.log("Response from server: ",response);
            const fetchedActivityList=response.rows||[]
            setActivitiesList(fetchedActivityList);

            if(fetchedActivityList){
                
                console.log("Activities were found!");
            }else{
                console.log("Actvities were not found!");
            }

        }catch(error){
            console.error("Error fetching user list:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        creazaActivitate();
        navigate("/Home")
    };

    return (
        <div>
            <h1>Creare activitate page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="descriereActivitate">Descriere activitate:</label>
                    <input
                        type="text"
                        id="descriereActivitate"
                        name="descriereActivitate"
                        value={descriereActivitate}
                        onChange={handleDescriereActivitateChange}
                    />
                </div>
                <div>
                    <label htmlFor="dataActivitate">Data activitate:</label>
                    <input
                        type="text"
                        id="dataActivitate"
                        name="dataActivitate"
                        value={dataActivitate}
                        onChange={handleDataActivitateChange}
                    />
                </div>
                <div>
                    <label htmlFor="codAcces">Cod acces:</label>
                    <input
                        type="text"
                        id="codAcces"
                        name="codAcces"
                        value={codAcces}
                        onChange={handleCodAccesChange}
                    />
                </div>
                <div>
                    <label htmlFor="durataActivitate">Durata activitate:</label>
                    <input
                        type="text"
                        id="durataActivitate"
                        name="durataActivitate"
                        value={durataActivitate}
                        onChange={handleDurataActivitateChange}
                    />
                </div>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#ff80ab', color: '#ffffff' }}>
                    Trimite
                </Button>
            </form>
        </div>
    );
}

export default CreareActivitate;
