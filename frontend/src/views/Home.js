import * as React from 'react';
import {Grid,Button} from '@mui/material';
import { Link } from 'react-router-dom';
import RowAndColumnSpacing from '../components/ActivitatiGrid';
 
 function Home(){





    return (
        <Grid container direction="column" alignItems="center" spacing={2}
        style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <Grid item>
        <h1 style={{ textAlign: 'center' }}>Tablou activitati</h1>
      </Grid>
      <Grid item>
        <RowAndColumnSpacing/>
      </Grid>
      <Grid item>
        <Link to="/CreareActivitate">
        <Button variant="contained" style={{ backgroundColor: '#ff80ab', color: '#ffffff' }}>
            Adauga o noua activitate
          </Button>
        </Link>
      </Grid>
    </Grid>
    )
 }

 export default Home;




