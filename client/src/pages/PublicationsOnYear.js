import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Helmet} from 'react-helmet';

export default function PublicationsOnYear({ match }) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <PubsOnYear ref={componentRef} theProps={match} />
    </div>
  );
}

class PubsOnYear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
      conferences: [],
      responseError: "",
      year: "",
      toShow: "",
      yearError: false
    };
  }

  getConferences = async ({ year } = this.state) => {
    await axios
      .get(`http://localhost:3001/coordinator/getJournalsOnYear/${year}`, {
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

  getJournals = async ({ year } = this.state) => {
    await axios
      .get(`http://localhost:3001/coordinator/getConferencesOnYear/${year}`, {
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

  render(
    { conferences, responseError, journals, year, toShow, yearError } = this.state,
  ) {
    return (
      <div>
        <Helmet>
          <title>Publications based on Year</title>
        </Helmet>
        <div className="mb-3">
          <label className="form-label">Select Academic Year</label> <br />
          <select
            value={year}

            onChange={async (e) => {
              await this.setState({ year: e.target.value });
              if(e.target.value !== ""){
                await this.setState({yearError: false})
               }

               if(toShow !== ""){
                this.getConferences();
                this.getJournals();
               }

            }}
          >
            <option value="">SELECT</option>
            <option value="2011">2011 - 2012</option>
            <option value="2012">2012 - 2013</option>
            <option value="2013">2013 - 2014</option>
            <option value="2014">2014 - 2015</option>
            <option value="2015">2015 - 2016</option>
            <option value="2016">2016 - 2017</option>
            <option value="2017">2017 - 2018</option>
            <option value="2018">2018 - 2019</option>
            <option value="2019">2019 - 2020</option>
            <option value="2020">2020 - 2021</option>
            <option value="2021">2021 - 2022</option>
          </select>
          {yearError && <h1 className="text-danger"> Please Select The Year First </h1>}
        </div>

        <div className="mb-3">
          <label className="form-label">Type of Publication</label> <br />
          <select
            value={toShow}
            onChange={async (e) => {
              if(year===""){
                await this.setState({yearError:true})
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
            <h1 style={{ textAlign: "center" }}>Publications Based on Year</h1>
            <br />
            <br />

            {(toShow === "both" || toShow ==="journals") && (<div>

<h1>Journals</h1>

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

<br />
<br />

</div>
) }

          {(toShow === "conferences" || toShow === "both") && (<div>
            
            <h1>Conferences</h1>

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
)}
            </div>
            
            )}

          </div>

      </div>
    );
  }
}
