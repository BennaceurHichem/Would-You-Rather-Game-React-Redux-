import { addUserQuestion, ADD_USER_QUESTION } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER= 'SAVE_QUESTION_ANSWER'
export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}


export function addQuestion(question){

        return{
            type:ADD_USER_QUESTION,question


        }

    }


    export function saveQuestionAnswer(authedUser,id,answer)
    {
        return{
            type:SAVE_QUESTION_ANSWER,
            authedUser,
            id,
            answer

        }

    }




