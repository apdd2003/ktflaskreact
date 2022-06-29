import "./inputdata.css";


export function saveData(){

    // let url = "http://127.0.0.1:5000/take_measurements";
    fetch("/save_data",
    { method: "POST",
    body: JSON.stringify({"data": {"MinTemp":22, "MaxTemp":44, "AverageTemp":33, "AmbientTemp":25, "LightIntensity":55454, 
                "GrapeType":'Malbec', "Pressure":"1"}}),
}).then(
      res => res.json()
    ).then(
      data => {
        
        console.log(data)
      }
    )
  
    
  
  }



function InputData() {
    return (
      <div className="inputcontainer">
            <label>Grape Type </label>
        <input type="text" placeholder="Enter Grape Type"/>
      <label>Pressure </label>
        <input type="text" placeholder="Enter Pressure"/>
        <button onClick = {()=>saveData()}>Save Data</button>
      </div>
    );
  }
  
  export default InputData;