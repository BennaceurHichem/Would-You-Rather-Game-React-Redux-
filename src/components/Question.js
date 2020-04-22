import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Redirect } from "react-router-dom"

class Question extends React.Component {
  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  loadQuestionDetails(e, questionId) {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    
    const {question, auth} = this.props;


    if (!question) {
      return <div>question doesn't exist please verify your request </div>
     
    }

    else{
      return (
       
        <Card className="question-card"  onClick={(e) => this.loadQuestionDetails(e, question.id)}>
         
          <CardBody className="card-body">
            <CardTitle className="card-title">Would You Rather..  <span role="img" aria-label="sheep">😏</span>?</CardTitle>
  
        
            <ListGroup>
              <ListGroupItem className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""  }>{question.optionOne.text}<span role="img" aria-label="sheep">☝️</span> </ListGroupItem>
              <ListGroupItem className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text} <span role="img" aria-label="sheep">✌️</span></ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      );
    }

  
  }
}


function mapStateToProps (state, { id }) {
  return {
    question : state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))