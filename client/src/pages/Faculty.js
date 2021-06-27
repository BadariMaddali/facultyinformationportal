import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Helmet} from 'react-helmet';

export default function Faculty({match}) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <FacultyInner ref={componentRef} theProps={match} />
    </div>
  );
}
class FacultyInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: "",
      facSummary: {
        facultyName: "",
        journalsCount: 0,
        conferencesCount: 0
      }
    };
  }
 getFacSummary = async () => {
    await axios
      .get("http://localhost:3001/faculty/getFacSummary", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({ facSummary: response.data });
          console.log(response.data);
        } else {
          this.setState({ responseError: response.data.error });
        }
      });

    console.log("weber");
  };
  componentDidMount() {
    this.getFacSummary();
  }
render({facSummary} = this.state){
  return (
    <div>
      <Helmet>
        <title>Faculty Information Portal</title>
      </Helmet>
      <br />
      <h1>Welcome {facSummary.facultyName}!</h1>
      <br />

      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Summary of Your Publications</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <h1> No.of Journals : {facSummary.journalsCount}</h1>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <h1> No.of Conferences : {facSummary.conferencesCount}</h1>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
}
