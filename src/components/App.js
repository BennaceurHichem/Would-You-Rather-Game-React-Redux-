import React from 'react';


import {_getQuestions} from  '../utils/_DATA.js'

import { connect } from 'react-redux'
import { handleInitialData }  from '../actions/shared'
import Dashboard from './Dashboard';
class  App extends React.Component {

    //the firts thing to do is getting all initial data in the parent which is App, stor it in the store then use piece oof data
    //as needed 
    componentDidMount(){
      this.props.dispatch(handleInitialData())
    }
    render() {
      return (
        <div>
          {this.props.loading === true
            ? null 
            : <Dashboard/>}
        </div>
      )
    }
  }
  
  function mapStateToProps ({ authedUser }) {
    return {
      loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
