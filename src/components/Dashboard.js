import React, { Component } from 'react'
import { connect } from 'react-redux'

//home is a container of all the Poll list(answred and unanswered)
class Dashboard extends Component {


  


    render() {
        return (
            <div>
                {this.props.questionIds.map( (id)=>{

                            return <p>question id :   {id}  </p>



                })}
            </div>
        )
    }


   
}

function mapStateToProps({ questions }) {
    //first thing is to test if question data is received, we will test with the id only for now 
    console.log("questions : "+questions)
    return {
        questionIds: questions ? Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp): null
    }
}

export default  connect(mapStateToProps)(Dashboard) 