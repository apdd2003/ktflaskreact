import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GrapeType(props) {
    const [grape_type, setGrapeType] = React.useState('');
    const [grapeData, setGrapeData] = React.useState([]);
    const handleChange = (event) => {
        
        setGrapeType(event.target.value);
        props.grapeVal(event.target.value)
        // console.log("gt==>",grape_type)
    };
    React.useEffect(() => {
        console.log("gt==>",grape_type)
        // document.getElementById("spinnerHistory").style.display = 'block';
        fetch("/grape_types").then(
            res => {
                if (!res.ok) {
                    return Promise.reject(res);
                }
                return res.json();
            }).then(
                data => {
                    console.log("Grapetype ====>", data['grape_types'])
                    setGrapeData(data['grape_types'])
                    // if (document.getElementById("spinnerHistory")) { document.getElementById("spinnerHistory").style.display = 'none'; }
                }
            ).catch(
                console.log("===error in grape type")
            )
        //   document.getElementById("spinnerMeasurement").style.display='none';
    }, [grape_type]);


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl className="form-control tf">
                <InputLabel id="demo-simple-select-label">Grape Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={grape_type}
                    label="Grape Type"
                    onChange={handleChange}
                    autoWidth
                >

                    {Object.values(grapeData).map((data, index) => (
                        <MenuItem
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        value={data.grape_type}>
                            {data.grape_type}

                        </MenuItem>
                    ))}


                </Select>
            </FormControl>
        </Box>
    );
}
