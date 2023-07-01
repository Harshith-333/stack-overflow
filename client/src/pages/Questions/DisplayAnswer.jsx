import React from 'react'
import { useParams,Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'
//import QuestionsDetails from './QuestionsDetails'
import { useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question'

const DisplayAnswer = ({question,handleShare}) => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const User=useSelector((state)=>(state.currentUserReducer))
    const handleDelete=(answerId,noofAnswers)=>{
        dispatch(deleteAnswer(id,answerId,noofAnswers-1))
    }
  return (
    <div>
        {
            
        question.answer.map((ans)=>(
            <div className="display-ans"  key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className='question-actions-user'>
                    <div>
                        <button type='button' onClick={handleShare}>Share</button>
                        {
                                            User?.result?._id===ans?.userId&&
                                                (<button type='button' onClick={()=>handleDelete(ans._id,question.noofAnswers)}>Delete</button>)
                                               
                                                    }
                    </div>
                    <div>
                        <p>answered {moment(ans.answerOn).fromNow()}</p>
                        <Link to={`/User/${ans.userId}`} className='user-link' style={{color:'#008d68'}}>
                                                        <Avatar backgroundColor='green' px='8px' py='5px'>
                                                            {ans.userAnswered.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <div>
                                                            {ans.userAnswered}
                                                        </div>
                          </Link>
                    </div>
                </div>
            </div>
        )) 
        }
    </div>
  )
}

export default DisplayAnswer