import React, {Fragment, useState} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Alert from "./components/layout/Alert";
import Search from './components/users/Search';
import User from './components/users/User';
import About from "./components/pages/About";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


import GithubState from "./context/gihub/GithubState";


const App = () => {    
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

 

 

  //get users repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  //set Alert
  const showAlert = (msg, type) => {

    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);

  };

  return (
    <GithubState>
    <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search 
                    setAlert={showAlert}
                  />
                </Fragment>
              )}/>
            <Route exact path='/about' component={About}/>
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}                  
                  getUserRepos={getUserRepos}                  
                  repos={repos}                  
                  />
              )}/>
          </Switch>

          <Users />
        </div>
      </div>
    </Router>
    </GithubState>
  );

};

export default App;
