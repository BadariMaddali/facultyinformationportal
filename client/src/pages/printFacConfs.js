import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export default function PrintFacConfs({match}) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <ViewCoordConferences ref={componentRef} theProps={match} />
    </div>
  );
}

class ViewCoordConferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journals:[],
      conferences:[],
      responseError: "",
    };
  }

  getConferences = async () => {
    const id = this.props.theProps.params.id;
    // console.log(this.props.theProps.params.id)
    await axios
      .get(`http://localhost:3001/coordinator/viewFacConfs/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({ conferences: response.data });
          // setconferences(response.data);
        } else {
          // setResponseError(response.data.error);
          this.setState({ responseError: response.data.error });
        }
      });
  };

  getJournals = async () => {
    const id = this.props.theProps.params.id;
    // console.log(this.props.theProps.params.id)
    await axios
      .get(`http://localhost:3001/coordinator/viewFacJournals/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({ journals: response.data });
          // setconferences(response.data);
        } else {
          // setResponseError(response.data.error);
          this.setState({ responseError: response.data.error });
        }
      });
  };

  componentDidMount() {
    this.getConferences();
    this.getJournals();
  }

  render({ conferences, responseError, journals } = this.state, { history } = this.props) {
    // return <div>Weber</div>

    return (
      <div>
        <h1>Conferences</h1>

        <h2 className="text-danger form-text">{responseError}</h2>

        {conferences && (
          <div>
            <table className="table table-bordered" style={{fontSize:"13px"}}>
              <thead>
                <tr>
                  <th scope="col">Sno</th>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Year</th>
                  <th scope="col">Name of Proceedings</th>
                  <th scope="col">Institution Organized</th>
                  <th scope="col">Vol No</th>
                  <th scope="col">Issue No</th>
                  <th scope="col">Issn No</th>
                  <th scope="col">DOI</th>
                  <th scope="col">Indexing</th>
                  <th scope="col">Page No</th>
                  <th scope="col">Published Book</th>
                  <th scope="col">Publisher Name</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {conferences &&
                  conferences.map((conference, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{conference.id}</th>
                        <td>{conference.facultyName}</td>
                        <td>{conference.title}</td>
                        <td>{conference.year}</td>
                        <td>{conference.proceedingsName}</td>
                        <td>{conference.institutionName}</td>
                        <td>{conference.volNo}</td>
                        <td>{conference.issueNo}</td>
                        <td>{conference.issnNo}</td>
                        <td>{conference.doi}</td>
                        <td>{conference.indexing}</td>
                        <td>{conference.pageNo}</td>
                        <td>{conference.publishedBook}</td>
                        <td>{conference.publisherName}</td>
                        <td
                          className="text-primary"
                          onClick={() =>
                            history.push(`/updateConference/${conference.id}`)
                          }
                        >
                          Update
                        </td>
                      </tr>
                    );
                  })}

                  {conferences.length === 0 && <tr><td colspan="14" style={{textAlign:"center"}}  className="text-danger">No Conferences Found</td></tr>}
              </tbody>
            </table>
          </div>
        )}



        <br/>
        <br/>


        <h1>Journals</h1>

<h2 className="text-danger form-text">{responseError}</h2>

{journals && (
  <div>
    <table className="table table-bordered" style={{fontSize:"13px"}}>
      <thead>
        <tr>
          <th scope="col">Sno</th>
          <th scope="col">Faculty Name</th>
          <th scope="col">Title</th>
          <th scope="col">Year</th>
          <th scope="col">Name of Proceedings</th>
          <th scope="col">Institution Organized</th>
          <th scope="col">Vol No</th>
          <th scope="col">Issue No</th>
          <th scope="col">Issn No</th>
          <th scope="col">DOI</th>
          <th scope="col">Indexing</th>
          <th scope="col">Page No</th>
          <th scope="col">Published Book</th>
          <th scope="col">Publisher Name</th>
          <th scope="col">Update</th>
        </tr>
      </thead>
      <tbody>
        {journals &&
          journals.map((conference, key) => {
            return (
              <tr key={key}>
                <th scope="row">{conference.id}</th>
                <td>{conference.facultyName}</td>
                <td>{conference.title}</td>
                <td>{conference.year}</td>
                <td>{conference.proceedingsName}</td>
                <td>{conference.institutionName}</td>
                <td>{conference.volNo}</td>
                <td>{conference.issueNo}</td>
                <td>{conference.issnNo}</td>
                <td>{conference.doi}</td>
                <td>{conference.indexing}</td>
                <td>{conference.pageNo}</td>
                <td>{conference.publishedBook}</td>
                <td>{conference.publisherName}</td>
                <td
                  className="text-primary"
                  onClick={() =>
                    history.push(`/updateConference/${conference.id}`)
                  }
                >
                  Update
                </td>
              </tr>
            );
          })}

{journals.length === 0 && <tr><td colspan="14" style={{textAlign:"center"}}  className="text-danger">No Journals Found</td></tr>}
      </tbody>
    </table>
  </div>
)}
      </div>
    );
  }
}
