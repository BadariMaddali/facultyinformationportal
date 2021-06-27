import React, { useRef } from "react";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import {Helmet} from 'react-helmet';


export default function PrintConferences () {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Conferences!</button>}
        content={() => componentRef.current}
      />
      <ViewCoordConferences ref={componentRef} />
    </div>
  );
};

class ViewCoordConferences extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      journals: [] ,
      responseError:""
    }
  }

   getJournals = async () => {
    await axios
      .get("http://localhost:3001/coordinator/viewConferences", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.setState({journals : response.data})
          // setJournals(response.data);
        }else{
            // setResponseError(response.data.error);
            this.setState({responseError : response.data.error})
        }
      });

    console.log("weber");
  };

  componentDidMount(){
    this.getJournals()
  }

  render({journals, responseError} = this.state, {history} = this.props ){

    // return <div>Weber</div>

       return  <div>
         <Helmet>
        <title>Conferences</title>
      </Helmet>
      <h1>View Conferences</h1>

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
                journals.map((journal, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{journal.id}</th>
                      <td>{journal.facultyName}</td>
                      <td>{journal.title}</td>
                      <td>{journal.year}</td>
                      <td>{journal.proceedingsName}</td>
                      <td>{journal.institutionName}</td>
                      <td>{journal.volNo}</td>
                      <td>{journal.issueNo}</td>
                      <td>{journal.issnNo}</td>
                      <td>{journal.doi}</td>
                      <td>{journal.indexing}</td>
                      <td>{journal.pageNo}</td>
                      <td>{journal.publishedBook}</td>
                      <td>{journal.publisherName}</td>
                    </tr>
                  );
                })}
                {journals.length === 0 && <tr><td colspan="14" style={{textAlign:"center"}}  className="text-danger">No Conferences Found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>



  }
}
