import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdatePassword({ history }) {
  const { id } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [responseError, setResponseError] = useState("");

  const updatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      axios
        .post(
          `http://localhost:3001/users/updatePassword/${id}`,
          {password: newPassword },

          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            setResponseError(response.data.error);
          } else {
            history.push("/faculty");
          }
        });
    }
  };

  return (
    <div className="loginContainer">
      <h1 style={{ marginBottom: "40px" }}>Faculty Information Portal</h1>

      <h2 className="text-danger form-text">{responseError}</h2>

      <label>Create New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />

      {passwordError && (
        <p className="text-danger form-text">Password Doesn't Match</p>
      )}

      <button onClick={updatePassword}> Update Password </button>
    </div>
  );
}
