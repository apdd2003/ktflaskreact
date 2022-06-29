import "./inputdata.css";
function InputData() {
    return (
      <div className="inputcontainer">
        <input type={"text"}  onChange={()=>this.value=""}/>
      </div>
    );
  }
  
  export default InputData;