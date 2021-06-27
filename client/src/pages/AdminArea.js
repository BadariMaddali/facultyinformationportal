import React from "react";
import { useHistory } from "react-router-dom";
import {Helmet} from 'react-helmet';

export default function AdminArea() {
  let history = useHistory();

  return (
    <div>
      <Helmet>
        <title>Faculty Information Portal</title>
      </Helmet>
      <br />
      <h1>Welcome, Admin!</h1>
      <br />
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h1 onClick={() => history.push("/addFaculty")}> Add Faculty </h1>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <h1 onClick={() => history.push("/addCoordinator")}>
                Add Coordinator
              </h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1 onClick={() => history.push("/viewFaculty")}>View Faculty</h1>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <h1 onClick={() => history.push("/viewCoordinators")}>
                View Coordinators
              </h1>
            </td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  );
}
