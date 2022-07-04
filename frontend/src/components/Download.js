import { useState, useEffect } from 'react';

function Download() {

 
  // const [mdata, setmdata] = useState({});
  const downloadcsv = () => {

    fetch("/download").then(
      res => {
        if (!res.ok && false) {
          console.log('response not OK');
          return Promise.reject(res);
        }
        return res.text();
      }).then(
        data => {
          console.log(data);
          // var lines = data.split(/\r\n|\n/);
          // for(var line = 0; line < lines.length-1; line++){
          //   console.log(line + " --> "+ lines[line]);
          // }
          // document.write(data);
          // var csv = JSON2CSV(data);
          // const a = document.createElement("a");
          // a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null)], {
          //   type: 'text/plain'
          // }));
          // a.setAttribute("download", "data.txt");
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);
          const a = document.createElement('a');  
          a.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);  
          // a.target = '_blank';  
            
          //provide the name for the CSV file to be downloaded  
          a.download = 'history.csv';  
          document.body.appendChild(a);
          a.click();  
          document.body.removeChild(a);

        }
      ).catch(
        console.log("download error")
      )

  }


  return (
    <div className='container'>
      <button onClick={() => downloadcsv()} className='tm btn btn-primary' >Download CSV</button>
    </div>
  );
}

export default Download;
