import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export default function Coordinator({match}) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <CoordinatorInner ref={componentRef} theProps={match} />
    </div>
  );
}


class CoordinatorInner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responseError: "",
      coordSummary: {
        department: "",
        facultyCount: 0,
        journalsCount: 0,
        conferencesCount: 0
      }
    };
  }

  getCoordinatorSummary = async () => {
    await axios
      .get("http://localhost:3001/coordinator/getCoordinatorSummary", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({ coordSummary: response.data });
          console.log(response.data);
        } else {
          this.setState({ responseError: response.data.error });
        }
      });

    console.log("weber");
  };

  componentDidMount() {
    this.getCoordinatorSummary();
  }


  render({coordSummary} = this.state){
    return (
      <div>
        <br />
        <h1>Welcome, {coordSummary.department.toUpperCase()}  Coordinator!</h1>
        <br />
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Summary of Your Department</th>
            </tr>
          </thead>
          <tbody>

          <tr>
            <th scope="row">
              <h1> No.of Faculty : {coordSummary.facultyCount}</h1>
            </th>
          </tr>

          <tr>
            <th scope="row">
              <h1> No.of Journals : {coordSummary.journalsCount}</h1>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <h1> No.of Conferences : {coordSummary.conferencesCount}</h1>
            </th>
          </tr>

          </tbody>
        </table>
      </div>
    );
  }
}
