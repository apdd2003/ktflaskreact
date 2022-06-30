import "./inputdata.css";


export function saveData() {

  var data = new FormData();
  data.append("grape_type", document.getElementById("grapeTypeData").value);
  data.append("pressure", document.getElementById("pressureData").value);


  // let url = "http://127.0.0.1:5000/take_measurements";
  fetch("/save_data",
    {
      method: "POST",

      // body: JSON.stringify({"data": {"MinTemp":22, "MaxTemp":44, "AverageTemp":33, "AmbientTemp":25, "LightIntensity":55454, 
      // "GrapeType":'Malbec', "Pressure":"1"}}),
      body: data,
    }).then(
      res => res.json()
    ).then(
      data => {

        console.log(data)
        document.getElementById("saveStatusMsg").innerHTML = data.status ? data.status : data.error;
      }
    )



}


function InputData() {
  return (
    <div className="inputcontainer container">
      <label>Grape Type </label>
      <input id="grapeTypeData" className="inputData form-control" type="text" placeholder="Enter Grape Type" />
      <label>Pressure </label>
      <input id="pressureData" className="inputData form-control" type="text" placeholder="Enter Pressure" />
      <button className="saveDataBtn btn btn-primary" onClick={() => saveData()}>Save Data</button>
      <div id="saveStatusMsg" className="alert alert-info" role="alert">

      </div>
    </div>
  );
}

export default InputData;