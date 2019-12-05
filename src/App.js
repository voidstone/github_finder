import React , { Component } from  'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Alert from "./components/layout/Alert";
import Search from './components/users/Search';



class App extends Component  { 

  state = {
    users : [],
    loading: false,
    alert: null,
  };

  // async componentDidMount() {
  //
  //   this.setState( { loading : true} );
  //
  //   const res = await axios.get(`https://api.github.com/users?client_id=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`);
  //
  //   this.setState( { users: res.data, loading :false })
  //
  // }

  //Search github users
  searchUsers = async text => {

    this.setState( { loading : true} );

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}}`);

    this.setState( { users: res.data.items, loading :false })
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

    const { users, loading } = this.state;
    
    return (
      <div className="App">  
        <Navbar />
        
        <div className="container">
          <Alert alert={ this.state.alert} />
          <Search
            searchUsers={ this.searchUsers }
            clearUsers={ this.clearUsers }
            showClear={ this.state.users.length > 0 }
            setAlert={ this.setAlert }
          />
          <Users loading={ loading } users={ users } />
        </div>
       
      </div>
    );
  }
  
}

export default App;
