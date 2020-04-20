import React from "react"
import PropTypes from "prop-types"
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import CardTitle from "reactstrap/es/CardTitle";
import './not_found.css'
import {withRouter} from 'react-router'

const NotFound = ({ history }) => (
  
  <>   
  
  <section id="not-found">
    <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
    <div className="circles">
      <p>404<br></br>
      <div className="text-center">

      <Button  color="primary" onClick={()=>history.push('/')}> Return to Home</Button>

      </div>
       <small>PAGE NOT FOUND</small>
      </p>
     
      <span className="circle big"></span>
      <span className="circle med"></span>
      <span className="circle small"></span>
    </div>

    
  </section>
        

 </>
);


export default withRouter(NotFound);

