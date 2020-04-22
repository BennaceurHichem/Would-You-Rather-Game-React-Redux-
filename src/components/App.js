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
import PropTypes from 'prop-types'
import history from './history'



class App extends Component {
  componentDidMount(){
    this.props.handleInitialData()
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router history={history}>
      <>
      <header>
        <LoadingBar />
      </header>
      <section>
        <LoadingBar scope="sectionBar" />
      </section>
        <div className="main-container">
       
          <NavBar location={this.props.location}/>
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
App.propTypes = {
  handleInitialData : PropTypes.func.isRequired,
  notLoggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App)