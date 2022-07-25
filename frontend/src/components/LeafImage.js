import * as React from 'react';
export default function LeafImage(props) {
    var image = props.image;
    // React.useEffect(() => {
    //     console.log("gt==>",leafImage)
    //     // document.getElementById("spinnerHistory").style.display = 'block';
    //     fetch("/take_measurements").then(
    //         res => {
    //             if (!res.ok) {
    //                 return Promise.reject(res);
    //             }
    //             return res.json();
    //         }).then(
    //             data => {
    //                 console.log("Leafdata ====>", data['encoded_img'])
    //                 setLeafImage(data['encoded_img'])
    //                 // if (document.getElementById("spinnerHistory")) { document.getElementById("spinnerHistory").style.display = 'none'; }
    //             }
    //         ).catch(
    //             console.log("===error in leaf image type")
    //         )
    //     //   document.getElementById("spinnerMeasurement").style.display='none';
    // }, []);
    return (


        <>
        <h5 className='center'>Leaf thermal image</h5>
            {image ? <img
                src={`data:image/jpg;base64,${props.image}`}
                width="50%"
                className='center'
                alt="Leaf Image"
            /> :
            <img
            src="noimage.png"
            width="50%"
            className='center'
            alt="Leaf Image"
        />}

        </>

    );
}