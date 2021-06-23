import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddFaculty() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("DEFAULT");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameError, setNameError] = useState("");
  const [facultyIdError, setFacultyIdError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [responseError, setResponseError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Please Enter Faculty Name");
    }

    if (facultyId === "") {
      setFacultyIdError("Please Enter Faculty ID");
    }

    if (department === "") {
      setDepartmentError("Please Enter Department");
    }

    if (qualification === "") {
      setQualificationError("Please Enter Qualification");
    }

    if (designation === "") {
      setDesignationError("Please Enter Designation");
    }

    if (email === "") {
      setEmailError("Please Enter Email");
    }

    if (phoneNumber === "") {
      setPhoneNumberError("Please Enter your Phone Number");
    }

    if (name !== "" && facultyId !== "" && email !== "" && department !== "") {
      await axios
        .post(
          "http://localhost:3001/admin/addFaculty",
          {
            name,
            facultyId,
            department,
            password,
            designation,
            qualification,
            email,
            phoneNumber
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
          } else {
            history.push("/viewFaculty");
          }
        });
    }
  };

  return (
    <div className="viewContainer">
      <h1>Add Faculty</h1>

      <h2 className="text-danger form-text">{responseError}</h2>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Enter Name of the Faculty</label>
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
            <p className="text-danger form-text">Faculty Name is Required</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Faculty ID</label>
          <input
            type="text"
            className="form-control"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setFacultyIdError("");
              }
            }}
          />

          {facultyIdError && (
            <p className="text-danger form-text">Faculty Id is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Email ID</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setEmailError("");
              }
            }}
          />
          {emailError && (
            <p className="text-danger form-text">Email is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Designation</label>
          <input
            type="text"
            className="form-control"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setDesignationError("");
              }
            }}
          />
          {designationError && (
            <p className="text-danger form-text">Designation is Required</p>
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
          <label className="form-label">Enter Qualification</label>
          <input
            type="text"
            className="form-control"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setQualificationError("");
              }
            }}
          />
          {qualificationError && (
            <p className="text-danger form-text">Qualification is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setPhoneNumberError("");
              }
            }}
          />
          {phoneNumberError && (
            <p className="text-danger form-text">Phone Number is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Password</label>
          <input
            type="text"
            className="form-control"
            disabled
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>


    </div>
  );
}
