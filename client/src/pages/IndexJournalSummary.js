import React, { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Helmet} from 'react-helmet';

export default function PubsIndexSummary({match}) {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Data!</button>}
        content={() => componentRef.current}
      />
      <PubsSummary ref={componentRef} theProps={match} />
    </div>
  );
}

class PubsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: [],
      journals:[],
      responseError: "",
    };
  }

  getJournals = async () => {

    await axios
      .get(`http://localhost:3001/coordinator/indexJournalsSummary`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({ journals: response.data });
        } else {
          this.setState({ responseError: response.data.error });
        }
      });
  };

  getConferences = async () => {

    await axios
      .get(`http://localhost:3001/coordinator/indexConferencesSummary`, {
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

  componentDidMount() {
    this.getConferences();
    this.getJournals();
  }

  render({ conferences, responseError, journals } = this.state, { history } = this.props) {
    // return <div>Weber</div>

    const {sciCount, nonSciJournals, scopusCount, doiJournals} = journals;
    const {ieeeCount,springerCount, doiConferences} = conferences;
    return (
      <div>
        <Helmet>
          <title>Summary</title>
        </Helmet>
        <h1 style={{margin:"20px"}} >Summary of Journal Publications</h1>

        <h2 className="text-danger form-text">{responseError}</h2>

        {journals && (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colspan="2" style={{textAlign:"center"}}  scope="col">Summary of Journal Publications</th>

                </tr>
              </thead>
              <tbody>

                      <tr>
                        <th scope="row">SCI/ ESCI Indexed Journals</th>
                        <td>{sciCount}</td>
                      </tr>

                      <tr>
                        <th scope="row">SCOPUS Indexed Journals</th>
                        <td>{scopusCount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Non SCI Indexed Journals</th>
                        <td>{nonSciJournals}</td>
                      </tr>

                      <tr>
                        <th scope="row">DOI Indexed Journals</th>
                        <td>{doiJournals}</td>
                      </tr>

                      <tr>
                        <th scope="row">Total Journals Published</th>
                        <td>{doiJournals + nonSciJournals + scopusCount + sciCount}</td>
                      </tr>

              </tbody>
            </table>
          </div>
        )}



        <br/>
        <br/>


        <h1>Conferences</h1>

<h2 className="text-danger form-text">{responseError}</h2>

{conferences && (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colspan="2" style={{textAlign:"center"}}  scope="col">Summary of Conference Publications</th>

                </tr>
              </thead>
              <tbody>

                      <tr>
                        <th scope="row">IEEE/IET Conferences</th>
                        <td>{ieeeCount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Springer Conferences</th>
                        <td>{springerCount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Conferences with DOI</th>
                        <td>{doiConferences}</td>
                      </tr>

                      <tr>
                        <th scope="row">Total Journals Published</th>
                        <td>{ieeeCount + springerCount + doiConferences}</td>
                      </tr>

              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
