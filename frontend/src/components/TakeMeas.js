// import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./takemeas.css";

export function takeMeasurements(setmdata){

  // let url = "http://127.0.0.1:5000/take_measurements";
  fetch("/take_measurements").then(
    res => res.json()
  ).then(
    data => {
      setmdata(data['dummy_db'])
      console.log(data['dummy_db']['AmbientTemp'])
    }
  )

  

}

function TakeMeas() {

  const [mdata, setmdata]=useState({});
  useEffect(()=>{
    // console.log(mdata)
  },[mdata]); 

    return (
      <>
        <button onClick={()=>takeMeasurements(setmdata)} className='tm' >Take Measurements</button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Min Temp</TableCell>
            <TableCell align="right">Max Temp</TableCell>
            <TableCell align="right">Avg Temp</TableCell>
            <TableCell align="right">Ambient Temp</TableCell>
            <TableCell align="right">LightIntensity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
              key={Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{mdata['MinTemp']}</TableCell>
              <TableCell align="right">{mdata['MaxTemp']}</TableCell>
              <TableCell align="right">{mdata['AverageTemp']}</TableCell>
              <TableCell align="right">{mdata['AmbientTemp']}</TableCell>
              <TableCell align="right">{mdata['LightIntensity']}</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
      </>
    );
  }
  
  export default TakeMeas;
  