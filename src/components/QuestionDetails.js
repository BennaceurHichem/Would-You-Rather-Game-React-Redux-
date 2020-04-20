import React, { PureComponent } from 'react';
import { Card, CardHeader,CardBody, CardTitle, FormGroup, Label, Input, Form, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import User from './User';
import { handleAnswer } from '../actions/shared';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: ''
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, questionAuthor, answer, total, percOne, percTwo} = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={questionAuthor.id}/>
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              {answer ?
                <div>
                  <FormGroup>
                
                    <div className="wrapper">
                            <input className="state" type="radio" name="app" id="1" value="1" checked={answer==="optionOne"} readOnly></input>
                            <label className="label" for="1">
                            <div className="indicator"></div>
                            <span className="text">1) {question.optionOne.text}</span>
                            </label>
                </div>
                     
                        <div className="wrapper">
                            <input className="state" type="radio" name="app" id="2" value="2" checked={answer==="optionTwo"} readOnly></input>
                            <label className="label" for="2">
                            <div className="indicator"></div>
                            <span className="text">2) {question.optionTwo.text}</span>
                            </label>
                 </div>
                  </FormGroup>
                  <div className="progress">
                    <div className="progress-one" style={{ width: `${percOne}%` }}>{`${percOne}%`}</div>
                    <div className="progress-two" style={{ width: `${percTwo}%` }}>{`${percTwo}%`}</div>
                  </div>
                  <div className="total">
                    Total number of votes: {total}
                  </div>
                </div>:
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                  <div className="wrapper">
                            <input className="state" type="radio" name="radio1" id="1" value="optionOne" onChange={this.radioSelected}y></input>
                            <label className="label" for="1">
                            <div className="indicator"></div>
                            <span className="text">1) {question.optionOne.text}</span>
                            </label>
                </div>
                <div className="wrapper">
                            <input className="state" type="radio" name="radio1" id="2" value="optionTwo" onChange={this.radioSelected}y></input>
                            <label className="label" for="2">
                            <div className="indicator"></div>
                            <span className="text">2) {question.optionTwo.text}</span>
                            </label>
                </div>
   
                  </FormGroup>
                  <div className="text-center">
                  <button className="button button--neumorphic" disabled={selectedOption === ''}>Submit</button>
                  </div>
                </Form>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}



function calculePercentage(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percOne, percTwo, total;
  const { id } = match.params;

  const question = questions[id];
  console.log("question: "+Object.keys(questions))
  if (question && answers.hasOwnProperty(question.id) ) {
    answer = answers[question.id]
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percOne = calculePercentage((question.optionOne.votes.length / total) * 100);
  percTwo = calculePercentage((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
