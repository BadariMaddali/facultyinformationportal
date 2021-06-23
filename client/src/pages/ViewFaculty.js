import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function ViewFaculty() {
  let history = useHistory();

  const [faculty, setFaculty] = useState([]);
  const [responseError, setResponseError] = useState("");

  const getFaculty = async () => {
    await axios
      .get("http://localhost:3001/admin/getFaculty", {
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
        } else {
          setResponseError(response.data.error);
        }
      });
  };

  useEffect(() => getFaculty(), []);

  return (
    <div>
      <h1>View Faculty</h1>

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
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {faculty &&
                faculty.map((fac, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{fac.facultyId}</th>
                      <td>{fac.name}</td>
                      <td>{fac.department}</td>
                      <td>{fac.designation}</td>
                      <td>{fac.qualification}</td>
                      <td>{fac.email}</td>
                      <td>{fac.phoneNumber}</td>
                      <td
                        className="text-primary"
                        onClick={() => history.push(`/updateFaculty/${fac.id}`)}
                      >
                        Update
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => deleteFaculty(fac.id)}
                      >
                        Delete
                      </td>
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
