import { TextField } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import "./inputdata.css";
import HistoricalData from "./HistoricalData";

function InputData() {
  const style = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
    /* width: 50%; */
  };
  const [resStatus, setResStatus] = useState("");
  const [resData, setResData] = useState([]);

  const saveData = (setResStatus) => {

    const mtemp = document.getElementById('minTemp').innerText;
    // console.log(mtemp, typeof mtemp)
    if (!mtemp){
      setResStatus("Please take measurements again!")
      return
    }
    var data = new FormData();
    data.append("grape_type", document.getElementById("grapeTypeData").value);
    data.append("pressure", document.getElementById("pressureData").value);


    fetch("/save_data",
      {
        method: "POST",

        body: data,
      }).then(
        res => res.json()
      ).then(
        data => {

          console.log("data=======", data)

          setResStatus(data.status ? data.status : data.error)
          if (data.status) {
            setResData(data.data);
          }
        }
      )
  }

  return (
    <div className="inputcontainer container ">
      <TextField id="grapeTypeData" className="form-control tf" label="Grape Type" variant="outlined" />
      <TextField id="pressureData" className="form-control tf" label="Pressure" variant="outlined" />
      <Button  style = {style} onClick={() => saveData(setResStatus)} variant="contained">Save</Button>
    
      {/* <button className="saveDataBtn btn btn-primary" onClick={() => saveData(setResStatus)}>Save Data</button> */}
      <div id="saveStatusMsg" className="alert alert-info" role="alert">
        {resStatus}
      </div>
      <HistoricalData changeHistory={resData} />
    </div>
  );
}

export default InputData;