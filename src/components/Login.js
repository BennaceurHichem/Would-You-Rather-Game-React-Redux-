import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, Row, Col,Button } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAuthedUser } from '../actions/authedUser'
//React Router Redirect Component
import { Redirect,withRouter } from 'react-router-dom'
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {userId : '',isLogged:false};
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }
  goBack(){
    this.props.history.goBack();
}



  handleChangeUser(event) {
    this.setState({userId: event.target.value});
  }

  handleSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    const {from} = this.props.location.state || {from: {pathname: '/'}}

    if (userId) {
   authenticate(userId);

   this.setState({isLogged:true})
   
   console.log("this is the from : "+Object.keys(from))
   this.props.history.goBack();
    } else {
      alert('Please select a user before.');
    }
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;
    /*
    console.log("tthis.props.location.state "+this.props.location.state.from)
    console.log("tthis.props.location.state.pathname"+this.props.location.state.pathname)
    console.log("tthis.props.location.state.from.state:  "+this.props.location.state.from.state) 
    */

    const { history } = this.props;


        
   
    return (

      
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="userSelect">Select User</Label>
              <Input 
                  id="userSelect"
                  type="select"
                  name="select"
                  value={userId}
                  onChange={this.handleChangeUser}
              >
                <option value="" disabled>Please select</option>
                {
                  Object.keys(users).map(user =>
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>)
                }
              </Input>
            </FormGroup>
         
            <div className="text-center">
                  <button className="button button--neumorphic" type="submit" value="Submit"  disabled={userId === ''}>Submit</button>
                  </div>
          </Form>
        </Col>
      </Row>
    );
  }


  componentWillReceiveProps(nextProps) {
    var routeChanged = nextProps.location !== this.props.location
    this.setState({ showBackButton: routeChanged })
  }
}



function mapStateToProps ({ users,authedUser }) {
  return {
    users,
    authedUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}


Login.propTypes = {
    users: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
