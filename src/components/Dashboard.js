import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Question from './Question';


//home is a container of all the Poll list(answred and unanswered)
class Dashboard extends Component {

    state = {
            //get the active tab between answered and unanswered
        active: '1'
      };
  
      switchTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
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
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.switchTab('2'); }}
                >
                  Answered
                </NavLink>
              </NavItem>
            </Nav>
    
            <TabContent activeTab={this.state.activeTab}>
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
  
  export default connect(mapStateToProps)(Dashboard)