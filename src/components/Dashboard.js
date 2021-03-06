import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Question from './Question';
import PropTypes from 'prop-types';

//home is a container of all the Poll list(answred and unanswered)
class Dashboard extends Component {

    state = {
            //get the active tab between answered and unanswered
        active: '1'
      };
  
      switchTab(tab) {
        if (this.state.active !== tab) {
          this.setState({
            active: tab
          });
        }
      }

    render() {

        const { unansweredQuestions, answeredQuestions } = this.props;



        return (
            <div>
            <Nav tabs style={{justifyContent:"center"}}>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.active === '1' })}
                  onClick={() => { this.switchTab('1'); }}
                >
                  Unanswered
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.active === '2' })}
                  onClick={() => { this.switchTab('2'); }}
                >
                  Answered
                </NavLink>
              </NavItem>
            </Nav>
    
            <TabContent activeTab={this.state.active}>
              <TabPane tabId="1">
                <Row>
                  {unansweredQuestions.map(qid =>
                    <Col key={qid} sm="12" md={{ size: 6, offset: 3 }}>
                      <Question id={qid}/>
                    </Col>
                  )}
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row >
                  {answeredQuestions.map(qid =>
                    <Col  key={qid} sm="12" md={{ size: 6, offset: 3 }}>
                      <Question id={qid}/>
                    </Col>
                  )}
                </Row>
              </TabPane>
            </TabContent>
          </div>
         
        )
    }


   
}

function mapStateToProps ({ questions, users, authedUser }) {
    const user = users[authedUser];
    const answeredQuestions = Object.keys(user.answers)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    return {
        
      unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      answeredQuestions
    }
  }


  Dashboard.propTypes = {
    answeredPolls : PropTypes.array,
    unansweredPolls : PropTypes.array
  };
  
  export default connect(mapStateToProps)(Dashboard)