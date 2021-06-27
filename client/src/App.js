import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import AdminArea from "./pages/AdminArea";
import axios from "axios";
import AddFaculty from "./pages/addFaculty";
import ViewFaculty from "./pages/ViewFaculty";
import AddCoordinator from "./pages/addCoordinator";
import ViewCoordinators from "./pages/viewCoordinators";
import updateCoordinator from "./pages/updateCoordinator";
import updateFaculty from './pages/updateFaculty';
import Coordinator from "./pages/Coordinator";
import CoordFaculty from "./pages/CoordFaculty";
import Faculty from "./pages/Faculty";
import AddJournal from "./pages/AddJournal";
import ViewJournals from "./pages/ViewJournals";
import UpdateJournal from "./pages/updateJournal";
import AddConference from "./pages/AddConference";
import ViewConferences from "./pages/ViewConferences";
import UpdateConference from "./pages/updateConference";
import UpdatePassword from "./pages/updatePassword";
import FacultyProfile from "./pages/facultyProfile";
import PrintConferences from "./pages/ViewCoordConferences";
import PrintJournals from "./pages/PrintJournals";
import PrintFacConfs from "./pages/printFacConfs";
import logo from './assets/logo.png';
import PubsIndexSummary from './pages/IndexJournalSummary';
import PublicationsOnYear from "./pages/PublicationsOnYear";
import PublicationsOnIndex from "./pages/PublicationsOnIndex";
import UploadJournals from "./pages/UploadJournals";
import UploadConferences from "./pages/UploadConferences";

export default function App() {

  const [authState, setAuthState] = useState({
    facultyId: "",
    user: {},
    status: false,
    isAdmin:false,
    isFaculty:false,
    isCoordinator:false
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ status: false });
        } else {
          console.log(response.data.user)
          const {
            isAdmin,
            isFaculty,
            isCoordinator,
          } = response.data.user;
  
          setAuthState((prevState) => ({ ...prevState, status: true }));
  
          if (isAdmin) {
            setAuthState((prevState) => ({ ...prevState, isAdmin: true }));
          } else if (isCoordinator) {
            setAuthState((prevState) => ({ ...prevState, isCoordinator: true }));
          } else if (isFaculty) {
            setAuthState((prevState) => ({ ...prevState, isFaculty: true }));
          }
          // setAuthState((prevState) => ({...prevState, status:true}) );
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ facultyId: "", user: {}, status: false });
  };

  const currentLogin = ({isAdmin, isCoordinator, isFaculty, status} = authState) => { 

    if(status){
      if (isAdmin) {
        return AdminArea;
       } else if (isCoordinator) {
         return Coordinator;
       } else if (isFaculty) {
         return Faculty;
       }
    }else{
      return Login;
    }

  };

  // const currentMenu = ({isAdmin, isCoordinator, isFaculty, status} = authState) => { 

  //   if(status){
  //     if (isAdmin) {
  //       return AdminArea;
  //      } else if (isCoordinator) {
  //        return Coordinator;
  //      } else if (isFaculty) {
  //        console.log("weber")
  //        return FacultyMenu;
  //      }
  //   }else{
  //     return Login;
  //   }

  // };

  // const menu = currentMenu();

  return (
   <div className="the-app">

<div className="header center">
        <a href="#">
        <img class="logo" src={logo} alt="College logo" />
        <h1>Faculty Information Portal</h1>
      </a>

        </div>
      <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>


<div class="container">

  <div className="row">

    <div className="col-2"> 
    
    {authState.isAdmin && <div className="list-group" style={{marginTop:"20px"}}>
    <a href="/admin" className="list-group-item list-group-item-action" style={{backgroundColor:"#680000", color:"white"}}  aria-current="true">
      Admin Menu
    </a>
    <a href="/addFaculty"  className="list-group-item list-group-item-action">Add Faculty</a>
    <a href="/addCoordinator"  className="list-group-item list-group-item-action">Add Coordinator</a>
    <a href="/viewFaculty"  className="list-group-item list-group-item-action">View Faculty</a>
    <a href="/viewCoordinators"  className="list-group-item list-group-item-action">View Coordinators</a>

    <a href="/login" className="list-group-item list-group-item-action" tabindex="-1" aria-disabled="true" onClick={logout}>Logout</a>
  </div>}
    {authState.isCoordinator && <div className="list-group" style={{marginTop:"20px"}}>
    <a href="/coordinator" className="list-group-item list-group-item-action" style={{backgroundColor:"#680000", color:"white"}}  aria-current="true">
      Coordinator Menu
    </a>
    <a href="/coordFaculty"  className="list-group-item list-group-item-action">View Faculty</a>
    <a href="/viewConfscoord"  className="list-group-item list-group-item-action">View Conferences</a>
    <a href="/printJournals"  className="list-group-item list-group-item-action">View Journals</a>
    <a href="/uploadJournals"  className="list-group-item list-group-item-action">Upload Journals</a>
    <a href="/uploadConferences"  className="list-group-item list-group-item-action">Upload Conferences</a>
    <a href="/pubsSummary" className="list-group-item list-group-item-action">Publications Summary</a>
    <a href="/pubsOnYear" className="list-group-item list-group-item-action">Publications Based On Year</a>
    <a href="/pubsOnIndex" className="list-group-item list-group-item-action">Publications Based On Index</a>
    

    <a href="/login" className="list-group-item list-group-item-action" tabindex="-1" aria-disabled="true" onClick={logout}>Logout</a>
  </div>}
    {authState.isFaculty && <div className="list-group" style={{marginTop:"20px"}}>
    <a href="/faculty" className="list-group-item list-group-item-action" style={{backgroundColor:"#680000", color:"white"}}  aria-current="true">
      Faculty Menu
    </a>
    <a href="/addJournal"  className="list-group-item list-group-item-action">Add Journal</a>
    <a href="/addConference"  className="list-group-item list-group-item-action">Add Conference</a>
    <a href="/viewJournals"  className="list-group-item list-group-item-action">View Journals</a>
    <a href="/viewConferences"  className="list-group-item list-group-item-action">View Conferences</a>
    <a href="/updateFacultyProfile"  className="list-group-item list-group-item-action">Update Profile</a>

    <a href="/login" className="list-group-item list-group-item-action" tabindex="-1" aria-disabled="true" onClick={logout}>Logout</a>
  </div>}


    </div>
          {/* <div className="navbar">
            <div className="links">
              
              {!authState.isAdmin && !authState.isCoordinator && !authState.isFaculty && <Link to="/">Home</Link>}

              {authState.isAdmin && <Link to="/admin">Home</Link>}

              {authState.isCoordinator && <Link to="/coordinator">Home</Link>}

              {authState.isFaculty && <Link to="/faculty">Home</Link>}

              {!authState.status && <Link to="/login">Login</Link>}
              {authState.status && <a href="/login"  style={{color:"white", textDecoration:"none"}} onClick={logout}>Logout</a>}

            </div>
          </div>
          <div className="footer center">
            <p>All rights reserved. 2021 &copy; | VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY</p>
            </div> */}

          <div className="col-10">

        <div className="App">
          <Switch>
            <Route path="/" exact component={currentLogin()}></Route>
            <Route path="/login" exact component={currentLogin()}></Route>
            <Route path="/admin" exact component={AdminArea}></Route>
            <Route path="/addFaculty" exact component={AddFaculty}></Route>
            <Route path="/viewCoordinators" exact component={ViewCoordinators}></Route>
            <Route path="/addCoordinator" exact component={AddCoordinator}></Route>
            <Route path="/viewFaculty" exact component={ViewFaculty}></Route>
            <Route path="/updateCoordinator/:id" exact component={updateCoordinator}></Route>
            <Route path="/updateFaculty/:id" exact component={updateFaculty} ></Route>
            <Route path="/coordinator" exact component={Coordinator}></Route>
            <Route path="/coordFaculty" exact component={CoordFaculty} ></Route>
            <Route path="/faculty" exact component={Faculty} ></Route>
            <Route path="/addJournal" exact component={AddJournal}></Route>
            <Route path="/viewJournals" exact component={ViewJournals} ></Route>
            <Route path="/updateJournal/:id" exact component={UpdateJournal} ></Route>
            <Route path="/addConference" exact component={AddConference}></Route>
            <Route path="/viewConferences" exact component={ViewConferences} ></Route>
            <Route path="/updateConference/:id" exact component={UpdateConference} ></Route>
            <Route path="/updatePassword/:id" exact component={UpdatePassword}></Route>
            <Route path="/updateFacultyProfile" exact component={FacultyProfile}></Route>
            <Route path="/viewConfscoord" exact component={PrintConferences}></Route>
            <Route path="/printJournals" exact component={PrintJournals}></Route>
            <Route path="/printFacConfs/:id" exact component={PrintFacConfs}></Route>
            <Route path="/pubsSummary" exact component={PubsIndexSummary}></Route>
            <Route path="/pubsOnYear" exact component={PublicationsOnYear}></Route>
            <Route path="/pubsOnIndex" exact component={PublicationsOnIndex}></Route>
            <Route path="/uploadJournals" exact component={UploadJournals}></Route>
            <Route path="/uploadConferences" exact component={UploadConferences}></Route>

          </Switch>

          </div>
          </div>    

          </div >

          </div>
          
        </Router>
      </AuthContext.Provider>
    </div>
    
   </div>
   
  );
}
