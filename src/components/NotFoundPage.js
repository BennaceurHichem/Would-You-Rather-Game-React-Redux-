import React from "react"
import PropTypes from "prop-types"
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import CardTitle from "reactstrap/es/CardTitle";
import './not_found.css'


const NotFound = ({ history }) => (
  
  <>   
  
  <section id="not-found">
    <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
    <div className="circles">
      <p>404<br></br>
      <Button className="button" color="primary" onclick={()=>history.push('/')}> Return to Home</Button>
       <small>PAGE NOT FOUND</small>
      </p>
     
      <span className="circle big"></span>
      <span className="circle med"></span>
      <span className="circle small"></span>
    </div>

    
  </section>
        

 </>
);


export default NotFound;

