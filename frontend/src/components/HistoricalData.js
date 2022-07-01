import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './historicalData.css';


function HistoricalData({changeHistory}) {
    const [hData, sethData] = useState([]);

    
    useEffect(() => {
        fetch("/history").then(
            res => {
                if (!res.ok) {
                    return Promise.reject(res);
                }
                return res.json();
            }).then(
            data => {
              console.log(data['historical_data'])
              sethData(data['historical_data'])
            }
          ).catch(
            console.log("error2")
          )
        //   document.getElementById("spinnerMeasurement").style.display='none';
        // console.log(mdata)
    }, [changeHistory]);

    return (
        <div className='container historical-data'>
            <h4>Historical Data</h4>  
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="right">Min Temp</TableCell>
                            <TableCell align="right">Max Temp</TableCell>
                            <TableCell align="right">Avg Temp</TableCell>
                            <TableCell align="right">Grape Type</TableCell>
                            <TableCell align="right">Pressure</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.values(hData).map((data,index)=>(
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{data.min_temp}</TableCell>
                            <TableCell align="right">{data.max_temp}</TableCell>
                            <TableCell align="right">{data.avg_temp}</TableCell>
                            <TableCell align="right">{data.grape_type}</TableCell>
                            <TableCell align="right">{data.pressure}</TableCell>
                        </TableRow>
                    ))}



                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default HistoricalData;