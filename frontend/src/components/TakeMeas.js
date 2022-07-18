// import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputData from './InputData';
import "./takemeas.css";



function TakeMeas() {
  const style = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    /* width: 50%; */
  };

  const [mdata, setmdata] = useState({});
  const takeMeasurements = (setmdata) => {

    document.getElementById("spinnerMeasurement").style.display = 'block';


    fetch("/take_measurements").then(
      res => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      }).then(
        data => {
          setmdata(data['dummy_db'])
          console.log(data['dummy_db']['AmbientTemp'])
          document.getElementById("spinnerMeasurement").style.display = 'none';
        }
      ).catch(
        console.log("Meas error")
      )

  }
  useEffect(() => {

    document.getElementById("spinnerMeasurement").style.display = 'none';
    // console.log(mdata)
  }, [mdata]);

  return (
    <div className='container'>
      <Button style={style} onClick={() => takeMeasurements(setmdata)} variant="contained">Take Measurements</Button>
      {/* <button  onClick={() => takeMeasurements(setmdata)} className='tm btn btn-primary' >Take Measurements</button> */}
      <div className="d-flex justify-content-center container">
        <div id="spinnerMeasurement" className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

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
              <TableCell align="right"><span id='minTemp'>{mdata['MinTemp']}</span></TableCell>
              <TableCell align="right">{mdata['MaxTemp']}</TableCell>
              <TableCell align="right">{mdata['AverageTemp']}</TableCell>
              <TableCell align="right">{mdata['AmbientTemp']}</TableCell>
              <TableCell align="right">{mdata['LightIntensity']}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
      <InputData/>
    </div>
  );
}

export default TakeMeas;
