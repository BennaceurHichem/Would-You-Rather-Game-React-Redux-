import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails"
import NotFoundPage from "./NotFoundPage"
import Logout from './Logout'
import ProtectedRoute from './ProtectedRoute'
function Routes(props) {
  return <div className="container">
    <Switch>
      {
        props.notLoggedIn ? <Route path='/' exact component={Login}/> :
          <Fragment>
            <ProtectedRoute path='/' exact component={Dashboard} />
            <ProtectedRoute path='/leaderboard' exact component={LeaderBoard} />
            <ProtectedRoute path='/add' component={NewQuestion}/>
            <ProtectedRoute path="/questions/:id" component={QuestionDetails} />
            <Route exact path='/logout' component={Logout} />
          </Fragment>
      }
      <Route component={NotFoundPage} />
    </Switch>
  </div>;
}

Routes.propTypes = {notLoggedIn: PropTypes.any};

export default Routes;