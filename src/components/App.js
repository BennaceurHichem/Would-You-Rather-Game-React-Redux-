import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom';

import { handleInitialData }  from '../actions/shared'
import Routes from './routes'
import NavBar from './NavBar';
import Login from './Login'
import NewQuestion from './NewQuestion';
import NotFoundPage from './NotFoundPage';
import LoadingBar from 'react-redux-loading-bar'





class App extends Component {
  componentDidMount(){
    this.props.handleInitialData()
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router>
      <>
      <header>
        <LoadingBar />
      </header>
      <section>
        <LoadingBar scope="sectionBar" />
      </section>
        <div className="main-container">
       
          <NavBar/>
          <Routes notLoggedIn={notLoggedIn}/>
        </div>
      </>
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