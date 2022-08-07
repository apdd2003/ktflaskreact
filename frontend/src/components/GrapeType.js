import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GrapeSelect() {
  const [grapeType, setGrapeType] = useState('');

  const handleChange = (event) => {
    const gtype = event.target.value;
    setGrapeType(gtype);
    console.log('grape===>', grapeType);
  };

  useEffect(() => { 
       console.log('Updated State===', grapeType)
    }, [grapeType])

  return (
    <Box sx={{  minWidth: 200 }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">GrapeType</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grapeType}
          label="GrapeType"
          onChange={handleChange}
          
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          
        </Select>
      </FormControl>
     </Box>
  );
}

