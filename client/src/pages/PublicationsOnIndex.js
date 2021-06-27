import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Helmet} from 'react-helmet';

export default function PublicationsOnIndex({ match }) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <PubsOnIndex ref={componentRef} theProps={match} />
    </div>
  );
}

class PubsOnIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
      conferences: [],
      responseError: "",
      index: "",
      toShow: "",
      indexError: false,
    };
  }

  getConferences = async ({ index } = this.state) => {
    await axios
      .get(`http://localhost:3001/coordinator/getJournalsOnIndex/${index}`, {
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

  getJournals = async ({ index } = this.state) => {
    await axios
      .get(`http://localhost:3001/coordinator/getConferencesOnIndex/${index}`, {
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

  async onSubmit(e) {
    e.preventDefault();
  }

  render({ conferences, responseError, journals, index, indexError, toShow } = this.state) {
    return (
      <div>
        <Helmet>
          <title>Publications based on Index</title>
        </Helmet>
        <div className="mb-3">
          <label className="form-label">Select Index</label> <br />
          <select
            value={index}
            onChange={async (e) => {
              await this.setState({ index: e.target.value });
              if(e.target.value !== ""){
                await this.setState({ indexError:false })
              }

              if(toShow !== ""){
                this.getConferences();
                this.getJournals();
              }
            }}
          >
            <option value="">SELECT</option>
            <option value="SCI/ ESCI">SCI/ ESCI</option>
            <option value="Non SCI">Non SCI</option>
            <option value="SCOPUS">SCOPUS</option>
            <option value="DOI">DOI</option>
            <option value="SPRINGER">SPRINGER</option>
            <option value="IEEE/IET">IEEE/IET</option>
            
          </select>
          {indexError
           && <h1 className="text-danger"> Please Select The Index First </h1>}
        </div>

        <div className="mb-3">
          <label className="form-label">Type of Publication</label> <br />
          <select
            value={toShow}
            onChange={async (e) => {
              if(index===""){
                await this.setState({indexError:true})
              }else{
                await this.setState({ toShow: e.target.value });
                this.getConferences();
                this.getJournals();
              }
            }}
          >
            <option value="">SELECT</option>
            <option value="journals">Journals</option>
            <option value="conferences">Conferences</option>
            <option value="both">Both</option>
          </select>
        </div>


<div>


          <div>
            <h1 style={{ textAlign: "center" }}>Publications Based on Index</h1>
            <br />
            <br />

            
          {(toShow === "both" || toShow === "journals") && (
            <div>
                          <h1>Journals</h1>

<h2 className="text-danger form-text">{responseError}</h2>

{conferences && (
  <div>
    <table className="table table-bordered" style={{fontSize:"11px"}}>
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
              </tr>
            );
          })}

        {conferences.length === 0 && (
          <tr>
            <td
              colspan="14"
              style={{ textAlign: "center" }}
              className="text-danger"
            >
              No Journals Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}
            </div>
          )}

            <br />
            <br />

          {(toShow === "both" || toShow === "conferences") && (

            <div>             <h1>Conferences</h1>

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
                          </tr>
                        );
                      })}

                    {journals.length === 0 && (
                      <tr>
                        <td
                          colspan="14"
                          style={{ textAlign: "center" }}
                          className="text-danger"
                        >
                          No Conferences Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )} </div>
          )}

          </div>


        </div>
      </div>
    );
  }
}
