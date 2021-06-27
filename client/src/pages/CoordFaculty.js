import React, { useState, useEffect } from "react";
import axios from "axios";
import {Helmet} from 'react-helmet';

export default function CoordFaculty({history}) {
  const [faculty, setFaculty] = useState([]);
  const [responseError, setResponseError] = useState("");

  const getFaculty = async () => {
    await axios
      .get("http://localhost:3001/coordinator/getFaculty", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setFaculty(response.data);
        } else {
          setResponseError(response.data.error);
        }
      });

    console.log("weber");
  };

  useEffect(() => getFaculty(), []);

  return (
    <div>
      <Helmet>
        <title>Faculty</title>
      </Helmet>
      <h1>Faculty of Your Department</h1>

      <h2 className="text-danger form-text">{responseError}</h2>
      {faculty && (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Faculty ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Designation</th>
                <th scope="col">Qualification</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
              </tr>
              
            </thead>
            <tbody>
              {faculty &&
                faculty.map((fac, key) => {
                  return (
                    <tr key={key}>
                      <th
                        scope="row"
                        onClick={() => history.push(`/printFacConfs/${fac.id}`)}
                      >
                        {fac.facultyId}
                      </th>
                      <td>{fac.name}</td>
                      <td>{fac.department}</td>
                      <td>{fac.designation}</td>
                      <td>{fac.qualification}</td>
                      <td>{fac.email}</td>
                      <td>{fac.phoneNumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

{faculty.length === 0 && <tr><td colspan="7" style={{textAlign:"center"}}  className="text-danger">No Faculty Found</td></tr>}
    </div>
  );
}
