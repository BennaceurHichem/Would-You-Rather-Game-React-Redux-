import React, { PureComponent } from 'react';
import { Card, CardHeader,CardBody, CardTitle, FormGroup, Label, Input, Form, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import User from './User';
import { handleAnswer } from '../actions/shared';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Redirect } from 'react-router-dom' 
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
    const { question, questionAuthor, answer, total, percOne, percTwo,authedUser,id} = this.props;
    const { selectedOption } = this.state;
    if ( !authedUser ) 
		{
			return <Redirect to={{
				pathname: '/',
				state: {
					returnPath: '/questions/' + id
				}
			}} />
		}

		if ( !question )
		{
			
        return (
          <div style={{margin:"auto"}}>
            <h1 className='center'>404 Question Error</h1>
            <p className='center'>Oops... It appears the question you are trying to reach doesn't exist</p>
            <p className='center'>You can go To home to see other Questions  <span role="img" aria-label="sheep">😄</span> </p>
          </div>
        )			
		}

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
                              <label className="label" htmlFor="1">
                              <div className="indicator"></div>
                              <span className="text">1) {question.optionOne.text}</span>
                              </label>
                  </div>
                       
                          <div className="wrapper">
                              <input className="state" type="radio" name="app" id="2" value="2" checked={answer==="optionTwo"} readOnly></input>
                              <label className="label" htmlFor="2">
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
                              <input className="state" type="radio" name="radio1" id="1" value="optionOne" onChange={this.radioSelected}></input>
                              <label className="label" htmlFor="1">
                              <div className="indicator"></div>
                              <span className="text">1) {question.optionOne.text}</span>
                              </label>
                  </div>
                  <div className="wrapper">
                              <input className="state" type="radio" name="radio1" id="2" value="optionTwo" onChange={this.radioSelected}></input>
                              <label className="label" htmlFor="2">
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

  const question = questions[id] ? questions[id]: null;
  console.log("question: "+Object.keys(questions))
  if (question && answers.hasOwnProperty(question.id) ) {
    answer = question ? answers[question.id]: null
  }
  const questionAuthor = question ? users[question.author]: null;
  total = question ? question.optionOne.votes.length + question.optionTwo.votes.length : null;
  percOne = question ? calculePercentage((question.optionOne.votes.length / total) * 100): null;
  percTwo = question ? calculePercentage((question.optionTwo.votes.length / total) * 100): null;
  return {
    id,
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo,
    authedUser
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
