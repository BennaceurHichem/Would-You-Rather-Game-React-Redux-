import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom';

import { handleInitialData }  from '../actions/shared'
import Routes from './routes'
import NavBar from './NavBar';
import Login from './Login'
import NewQuestion from './NewQuestion';

class App extends Component {
  componentDidMount(){
    this.props.handleInitialData()
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className="main-container">

          <NewQuestion  />
           
           {/* 

 <NavBar/>

            <Routes notLoggedIn={notLoggedIn}/>*/} 
          </div>
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)