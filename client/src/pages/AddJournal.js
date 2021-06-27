import axios from "axios";
import React, { useState } from "react";
import {Helmet} from 'react-helmet';

export default function AddJournal({ history }) {
  const [journalData, setJournalData] = useState({
    facultyName: "",
    title: "",
    year: "",
    journalsName: "",
    volNo: "",
    issueNo: "",
    issnNo: "",
    doi: "",
    indexing: "",
    pageNo: "",
    publishedBook: "",
    publisherName: "",
  });

  const [journalDataError, setJournalDataError] = useState({
    facultyName: false,
    title: false,
    year: false,
    journalsName: false,
    volNo: false,
    issueNo: false,
    issnNo: false,
    doi: false,
    indexing: false,
    pageNo: false,
    publishedBook: false,
    publisherName: false,
  });

  const [responseError, setResponseError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (journalData.facultyName === "") {
      await setJournalDataError((prevState) => ({
        ...prevState,
        facultyName: true,
      }));
    }

    if (journalData.title === "") {
      await setJournalDataError((prevState) => ({ ...prevState, title: true }));
    }

    if (journalData.year === "") {
      await setJournalDataError((prevState) => ({ ...prevState, year: true }));
    }

    if (journalData.journalsName === "") {
      setJournalDataError((prevState) => ({
        ...prevState,
        journalsName: true,
      }));
    }

    if (journalData.issueNo === "") {
      setJournalDataError((prevState) => ({ ...prevState, issueNo: true }));
    }

    if (journalData.issnNo === "") {
      setJournalDataError((prevState) => ({ ...prevState, issnNo: true }));
    }

    if (journalData.doi === "") {
      setJournalDataError((prevState) => ({ ...prevState, doi: true }));
    }

    if (journalData.indexing === "") {
      setJournalDataError((prevState) => ({ ...prevState, indexing: true }));
    }

    if (
      journalData.facultyName !== "" &&
      journalData.title !== "" &&
      journalData.year !== "" &&
      journalData.issueNo !== "" &&
      journalData.issnNo !== ""
      
    ) {

        await axios
        .post(`http://localhost:3001/faculty/addJournal`, journalData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
            setResponseError(response.data.error);
          } else {
            history.push("/viewJournals");
          }
        });

    console.log(journalData);

    }
  };

  return (
    <div className="viewContainer">
      <Helmet>
        <title>Add Journal</title>
      </Helmet>
      <h1>Add Journal</h1>
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
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({
                  ...journalDataError,
                  facultyName: false,
                });
              }
            }}
            className="form-control"
          />
          {journalDataError.facultyName && (
            <p className="text-danger form-text">Faculty Name is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter the Title</label>
          <input
            type="text"
            value={journalData.title}
            onChange={(e) =>
              setJournalData({ ...journalData, title: e.target.value })
            }
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({ ...journalDataError, title: false });
              }
            }}
            className="form-control"
          />

          {journalDataError.title && (
            <p className="text-danger form-text">Title is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Year</label> <br />

          <select
          value={journalData.year}
          onChange={(e) => setJournalData({ ...journalData, year: e.target.value })}
          onBlur={(e) => {
            if (e.target.value !== "") {
              setJournalDataError({ ...journalDataError, year: false });
            }
          }}
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


          {journalDataError.year && (
            <p className="text-danger form-text">Year is Required</p>
          )}
        </div>

      
        <div className="mb-3">
          <label className="form-label">Enter Name of Journals</label>
          <input
            type="text"
            value={journalData.journalsName}
            onChange={(e) =>
              setJournalData({ ...journalData, journalsName: e.target.value })
            }
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({
                  ...journalDataError,
                  journalsName: false,
                });
              }
            }}
            className="form-control"
          />

          {journalDataError.journalsName && (
            <p className="text-danger form-text">Journal Name is Required</p>
          )}
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
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({ ...journalDataError, issueNo: false });
              }
            }}
            className="form-control"
          />

          {journalDataError.issueNo && (
            <p className="text-danger form-text">Issue Number is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Issn Number</label>
          <input
            type="text"
            value={journalData.issnNo}
            onChange={(e) =>
              setJournalData({ ...journalData, issnNo: e.target.value })
            }
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({ ...journalDataError, issnNo: false });
              }
            }}
            className="form-control"
          />

          {journalDataError.issnNo && (
            <p className="text-danger form-text">ISSN Number is Required</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Enter DOI</label>
          <input
            type="text"
            value={journalData.doi}
            onChange={(e) =>
              setJournalData({ ...journalData, doi: e.target.value })
            }
            onBlur={(e) => {
              if (e.target.value !== "") {
                setJournalDataError({ ...journalDataError, doi: false });
              }
            }}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Indexing</label> <br/>

          <select
          value={journalData.indexing}
          onChange={(e) => setJournalData({ ...journalData, indexing: e.target.value })}
          onBlur={(e) => {
            if (e.target.value !== "") {
              setJournalDataError({ ...journalDataError, indexing: false });
            }
          }}
        >
          <option value="">SELECT</option>
          <option value="SCI/ ESCI">SCI/ ESCI</option>
          <option value="Non SCI">Non SCI</option>
          <option value="SCOPUS">SCOPUS</option>
          <option value="DOI">DOI</option>

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
          <label className="form-label">Enter Publisher Name</label>
          <input
            type="text"
            value={journalData.publisherName}
            onChange={(e) =>
              setJournalData({ ...journalData, publisherName: e.target.value })
            }
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
