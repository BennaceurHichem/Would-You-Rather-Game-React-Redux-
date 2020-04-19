import { getInitialData } from '../utils/api'
import { setAuthedUser} from '../actions/authedUser'
import { addUserQuestion, saveUserAnswer,receiveUsers } from '../actions/users'
import { addQuestion, receiveQuestions, saveQuestionAnswer } from '../actions/questions'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions})=> {

                //get all neeeded data for to manage it from the store directly 
                
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
        })
    }
} 




export function handleAddQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(authedUser, question.id))
        })

    }
}

export function handleAnswer (qid, option) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      const info = {
        authedUser: authedUser,
        qid,
        answer: option
      };
      _saveQuestionAnswer(info)
          .then(() => {
              dispatch(saveQuestionAnswer(authedUser, qid, option));
              dispatch(saveUserAnswer(authedUser, qid, option))
          })
    }
}