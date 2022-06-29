import * as React from 'react';
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

  setmdata("hello")

}

function TakeMeas() {

  const [mdata, setmdata]=useState("");
  useEffect(()=>{

  },[mdata]); 

    return (
      <>
        <button onClick={()=>setmdata("new h"+Math.random())} className='tm' >Take Measurements</button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Min Temp</TableCell>
            <TableCell align="right">Max Temp</TableCell>
            <TableCell align="right">Avg Temp</TableCell>
            <TableCell align="right">AmbientTemp</TableCell>
            <TableCell align="right">LightIntensity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
              key={Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {mdata}
              </TableCell>
              <TableCell align="right">{mdata}</TableCell>
              <TableCell align="right">{mdata}</TableCell>
              <TableCell align="right">{mdata}</TableCell>
              <TableCell align="right">{mdata}</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
      </>
    );
  }
  
  export default TakeMeas;
  