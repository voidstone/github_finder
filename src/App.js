import React, {Component, Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Alert from "./components/layout/Alert";
import Search from './components/users/Search';
import User from './components/users/User';
import About from "./components/pages/About";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


class App extends Component  {

  state = {
    users : [],
    user : {},
    loading: false,
    alert: null,
  };

  //Search github users
  searchUsers = async text => {

    this.setState( { loading : true} );

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState( { users: res.data.items, loading :false })
  };

  //Get a single Github user
  getUser = async username => {
    this.setState( { loading : true} );

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });

  };


  //Clear users from state
  clearUsers = () => {
    this.setState( { users: [], loading: false} )
  };

  //set Alert
  setAlert = (msg, type) => {
    this.setState( {alert: { msg, type}} );

    setTimeout( () => this.setState( { alert : null}),5000);

  };
  
  render() {

    const { users, user, loading } = this.state;
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={ this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={ props =>(
                <Fragment>
                  <Search
                    searchUsers={ this.searchUsers }
                    clearUsers={ this.clearUsers }
                    showClear={ this.state.users.length > 0 }
                    setAlert={ this.setAlert }
                  />
                </Fragment>
              )}/>
              <Route exact path='/about' component={ About }/>
              <Route
                exact
                path='/user/:login'
                render={ props => (
                  <User
                        {...props }
                        getUser={ this.getUser }
                        user={ user }
                        loading={ loading }/>
                    ) } />
            </Switch>

            <Users loading={ loading } users={ users } />
          </div>
        </div>
      </Router>
    );
  }
  
}

export default App;
