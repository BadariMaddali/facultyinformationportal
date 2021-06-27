import React, { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet';

export default function AddCoordinator() {

  let history = useHistory();

  const [name, setName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("DEFAULT");

  const [nameError, setNameError] = useState("");
  const [coordinatorIdError, setCoordinatorIdError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [responseError, setResponseError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Please Enter Faculty Name");
    }

    if (coordinatorId === "") {
    setCoordinatorIdError("Please Enter Faculty ID");
    }

    if (department === "") {
      setDepartmentError("Please Enter Department");
    }

    if (name !== "" && coordinatorId !== "" && department !== "") {
      await axios
        .post(
          "http://localhost:3001/admin/addCoordinator",
          {
            name,
            facultyId : coordinatorId,
            department,
            password,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
            setResponseError(response.data.error);
          }else{
              history.push("/viewCoordinators");
          }
        });
    }
  };

  return (
    <div className="viewContainer">
      <Helmet>
            <title>Add Coordinator</title>
          </Helmet>
      <h1>Add Coordinator</h1>

      <h2 className="text-danger form-text">{responseError}</h2>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Enter Name of the Coordinator</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setNameError("");
              }
            }}
            className="form-control"
          />
          {nameError && (
            <p className="text-danger form-text">Coordinator Name is Required</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Coordinator ID</label>
          <input
            type="text"
            className="form-control"
            value={coordinatorId}
            onChange={(e) => setCoordinatorId(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setCoordinatorIdError("");
              }
            }}
          />

          {coordinatorIdError && (
            <p className="text-danger form-text">CoordinatorId Id is Required</p>
          )}
        </div>



        <div className="mb-3">
          <label className="form-label">Enter Department</label> <br/>
          <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          onBlur={(e) => {
            if (e.target.value !== "") {
              setDepartmentError("");
            }
          }}
        >
          <option value="">SELECT</option>
          <option value="ece">ECE</option>
          <option value="cse">CSE</option>
          <option value="eee">EEE</option>
          <option value="civil">CIVIL</option>
          <option value="mech">MECH</option>
        </select>
          {departmentError && (
            <p className="text-danger form-text">Department is Required</p>
          )}
        </div>





        <div className="mb-3">
          <label className="form-label">Enter Password</label>
          <input
            type="text"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>


      {/* <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name of the Coordinator"
          onBlur={(e) => {
            if (e.target.value !== "") {
              setNameError("");
            }
          }}
        />

        {nameError && (
          <p className="text-danger form-text">Coordinator Name is Required</p>
        )}

        <input
          type="text"
          value={coordinatorId}
          name="coordinatorId"
          onChange={(e) => setCoordinatorId(e.target.value)}
          placeholder="Enter Coordinator Id"
          onBlur={(e) => {
            if (e.target.value !== "") {
              setCoordinatorIdError("");
            }
          }}
        />

        {coordinatorIdError && (
          <p className="text-danger form-text">Coordinator Id is Required</p>
        )}

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          onBlur={(e) => {
            if (e.target.value !== "") {
              setDepartmentError("");
            }
          }}
        >
          <option value="">SELECT</option>
          <option value="ece">ECE</option>
          <option value="cse">CSE</option>
          <option value="eee">EEE</option>
          <option value="civil">CIVIL</option>
          <option value="mech">MECH</option>
        </select>

        {departmentError && (
          <p className="text-danger form-text">Department is Required</p>
        )}

        <input
          type="text"
          value={password}
          name="facultyId"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="SET A PASSWORD FOR FACULTY"
          disabled
        />

        <input type="submit" value="CREATE CO ORDINATOR" />
      </form>
     */}
    </div>
  );
}
