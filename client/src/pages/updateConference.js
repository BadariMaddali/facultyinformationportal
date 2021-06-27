import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {Helmet} from 'react-helmet';

export default function UpdateConference({ history }) {
  let { id } = useParams();
  const [journalData, setJournalData] = useState({
    facultyName: "",
    title: "",
    year: "",
    proceedingsName: "",
    institutionName: "",
    volNo: "",
    issueNo: "",
    issnNo: "",
    doi: "",
    indexing: "",
    pageNo: "",
    publishedBook: "",
    publisherName: "",
  });
  const [responseError, setResponseError] = useState("");

  const getJournal = async () => {
    await axios
      .get(`http://localhost:3001/faculty/getConference/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setJournalData(response.data);
        } else {
          console.log(response.data.error);
          setResponseError(response.data.error);
        }
      });

    console.log("weber");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3001/faculty/updateConference/${id}`, journalData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          setResponseError(response.data.error);
        } else {
          history.push("/viewConferences");
        }
      });
  };

  useEffect(() => getJournal(), []);

  return (
    <div className="viewContainer">
      <Helmet>
        <title>Update Conference</title>
      </Helmet>
      <h1>Update Conference!</h1>
      <h2 className="text-danger form-text">{responseError}</h2>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Enter Faculty Name</label>
          <input
            type="text"
            value={journalData.facultyName}
            onChange={(e) =>
              setJournalData({ ...journalData, facultyName: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter the Title</label>
          <input
            type="text"
            value={journalData.title}
            onChange={(e) =>
              setJournalData({ ...journalData, title: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Year</label> <br />

          <select
          value={journalData.year}
          onChange={(e) => setJournalData({ ...journalData, year: e.target.value })}

        >
          <option value="">SELECT</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>

        </div>

        <div className="mb-3">
          <label className="form-label">Enter Name of Proceedings</label>
          <input
            type="text"
            value={journalData.proceedingsName}
            onChange={(e) =>
              setJournalData({ ...journalData, proceedingsName: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
              <label className="form-label">Enter Name of Institution Organized</label>
              <input
                type="text"
                value={journalData.institutionName}
                onChange={(e) =>
                  setJournalData({ ...journalData, institutionName: e.target.value })
                }

                className="form-control"
              />

            </div>
    

        <div className="mb-3">
          <label className="form-label">Enter Volume Number</label>
          <input
            type="text"
            value={journalData.volNo}
            onChange={(e) =>
              setJournalData({ ...journalData, volNo: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Issue Number</label>
          <input
            type="text"
            value={journalData.issueNo}
            onChange={(e) =>
              setJournalData({ ...journalData, issueNo: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Issn Number</label>
          <input
            type="text"
            value={journalData.issnNo}
            onChange={(e) =>
              setJournalData({ ...journalData, issnNo: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter DOI</label>
          <input
            type="text"
            value={journalData.doi}
            onChange={(e) =>
              setJournalData({ ...journalData, doi: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Indexing</label> <br/>

          <select
          value={journalData.indexing}
          onChange={(e) => setJournalData({ ...journalData, indexing: e.target.value })}
        >
          <option value="">SELECT</option>
          <option value="SCI/ ESCI">SCI/ ESCI</option>
          <option value="Non SCI">Non SCI</option>
          <option value="SCOPUS">SCOPUS</option>
          <option value="DOI">DOI</option>
          <option value="Springer">Springer</option>

        </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Page Number</label>
          <input
            type="text"
            value={journalData.pageNo}
            onChange={(e) =>
              setJournalData({ ...journalData, pageNo: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Published Book</label>
          <input
            type="text"
            value={journalData.publishedBook}
            onChange={(e) =>
              setJournalData({ ...journalData, publishedBook: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Publisher Name</label> <br/>
          <select
          value={journalData.publisherName}
          onChange={(e) => setJournalData({ ...journalData, publisherName: e.target.value })}

        >
          <option value="">SELECT</option>
          <option value="IEEE/IET">IEEE/IET</option>
          <option value="Springer">Springer</option>
          <option value="DOI">DOI</option>


        </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
      </form>
    </div>
  );
}
