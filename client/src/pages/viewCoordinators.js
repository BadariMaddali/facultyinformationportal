import axios from "axios";
import React, { useEffect, useState } from "react";
import {Helmet} from 'react-helmet';

export default function ViewCoordinators({history}) {
  const [faculty, setFaculty] = useState([]);
  const [responseError, setResponseError] = useState("");

  const getFaculty = async () => {
    await axios
      .get("http://localhost:3001/admin/getCoordinators", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setFaculty(response.data);
        }
      });

    console.log("weber");
  };

  const deleteFaculty = async (id) => {
    await axios
      .delete(`http://localhost:3001/admin/deleteFaculty/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          history.go(0);
        }else{
          setResponseError(response.data.error);
        }
      });
  
    console.log("weber");
  };


  useEffect(() => getFaculty(), []);

  return (
    <div>
      <Helmet>
        <title>View Coordinators</title>
      </Helmet>
      <h1>View Coordinators</h1>

      <h2 className="text-danger form-text">{responseError}</h2>

      {faculty && (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Coordinator ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((fac, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{fac.facultyId}</th> 
                    <td>{fac.name}</td>
                    <td>{fac.department}</td>
                    <td className="text-primary" onClick={()=> history.push(`/updateCoordinator/${fac.id}`)}  > Update</td>
                    <td className="text-danger"onClick={() =>  deleteFaculty(fac.id)} >Delete</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
