import React from "react";
import {parse} from "papaparse";
import axios from 'axios';
import {Helmet} from 'react-helmet';

export default function UploadConferences({history}) {

    const uploadConferences = async (conferences)=> {
        console.log(conferences)

        await axios
        .post(`http://localhost:3001/coordinator/addConferences`, conferences, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);

          } else {
            history.push("/viewConfscoord");
          }
        });
    }


  return (
    <div>
      <Helmet>
        <title>Upload Conferences</title>
      </Helmet>
      <h1>Upload Conferences</h1> <br/>
      <div
        style={{ borderStyle: "dashed", padding: "30px 10px", textAlign:"center"  }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log(e.dataTransfer.files);
          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
                const text = await file.text();
                 const result = await parse(text, {header: true})
                 console.log(result.data)
                uploadConferences(result.data);
            });
        }}
      >
        DROP HERE 
      </div>
    </div>
  );
}
