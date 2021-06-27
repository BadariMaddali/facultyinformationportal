import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import {Helmet} from 'react-helmet';

export default function UpdateCoordinator(){

    let history = useHistory();
    let { id } = useParams();
    const [facultyData, setFacultyData] = useState({
        name: "",
        facultyId: "",
        password: "",
        department: ""
      });
      const [responseError, setResponseError] = useState("");

      const getFaculty = async () => {
        await axios
          .get(`http://localhost:3001/admin/getFaculty/${id}`, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            if (!response.data.error) {
              setFacultyData(response.data);
            } else {
              console.log(response.data.error);
              setResponseError(response.data.error);
            }
          });
    
        console.log("weber");
      };

      useEffect(() => {getFaculty()}, []);

      const onSubmit = async (e) => {
        e.preventDefault();
        await axios
          .post(`http://localhost:3001/admin/updateCoordinator/${id}`, facultyData, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
              setResponseError(response.data.error);
            } else {
              history.push("/viewCoordinators");
            }
          });
      };

    return <div className="viewContainer">
      <Helmet>
        <title>Update Coordinator</title>
      </Helmet>
        <h1>Update Coordinator</h1>
        <h2 className="text-danger form-text">{responseError}</h2>
        
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Enter Name of the Faculty</label>
          <input
            type="text"
            value={facultyData.name}
            onChange={(e) =>
              setFacultyData({ ...facultyData, name: e.target.value })
            }
            className="form-control"
          />

          <div className="mb-3">
            <label className="form-label">Enter Faculty ID</label>
            <input
              type="text"
              className="form-control"
              value={facultyData.facultyId}
              onChange={(e) =>
                setFacultyData({ ...facultyData, facultyId: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Department</label> <br />
            <select
              value={facultyData.department}
              disabled
              onChange={(e) =>
                setFacultyData({ ...facultyData, department: e.target.value })
              }
            >
              <option value="">SELECT</option>
              <option value="ece">ECE</option>
              <option value="cse">CSE</option>
              <option value="eee">EEE</option>
              <option value="civil">CIVIL</option>
              <option value="mech">MECH</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Password</label>
            <input
              type="text"
              className="form-control"
              value={facultyData.password}
              onChange={(e) =>
                setFacultyData({ ...facultyData, password: e.target.value })
              }
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
   
    </div>
}