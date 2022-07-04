import { useState, useEffect } from 'react';

function Download() {

  const [mdata, setmdata] = useState({});
  const downloadcsv = (setmdata) => {



    fetch("/download").then(
      res => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      }).then(
        data => {
            console.log(data);
        }
      ).catch(
        console.log("Meas error")
      )

  }
  useEffect(() => {

  }, [mdata]);

  return (
    <div className='container'>
      <button onClick={() => downloadcsv(setmdata)} className='tm btn btn-primary' >Download CSV</button>     
    </div>
  );
}

export default Download;
