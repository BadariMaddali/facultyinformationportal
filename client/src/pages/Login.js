import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  let history = useHistory();
  console.log(history);

  const login = () => {
    const data = { email, password };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (response.data.error) {
        setLoginError(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);

        const {
          isAdmin,
          isFaculty,
          isCoordinator,
          password,
          id,
        } = response.data.user;

        setAuthState((prevState) => ({ ...prevState, status: true }));

        if (isAdmin) {
          setAuthState((prevState) => ({ ...prevState, isAdmin: true }));
          history.push("/admin");
        } else if (isCoordinator) {
          setAuthState((prevState) => ({ ...prevState, isCoordinator: true }));
          history.push("/coordinator");
        } else if (isFaculty) {
          setAuthState((prevState) => ({ ...prevState, isFaculty: true }));

          if (password === "DEFAULT") {
            history.push(`/updatePassword/${id}`);
          } else {
            history.push("/faculty");
          }
        }
      }
    });
  };
  return (
    <div className="loginContainer">
      <h1 style={{ marginBottom: "40px" }}>Faculty Information Portal</h1>

      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <h2 className="text-danger form-text">{loginError}</h2>
      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;
