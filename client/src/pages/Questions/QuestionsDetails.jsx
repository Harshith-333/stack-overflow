import React, { useState } from 'react'
import { useParams ,Link,useNavigate,useLocation} from 'react-router-dom'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector,useDispatch } from 'react-redux'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer } from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { deleteQuestion,voteQuestion } from '../../actions/question'


const QuestionsDetails = () => {
    const {id}=useParams()
    console.log(id)
    const questionsList=useSelector(state=>state.questionsReducer)
    // var questionsList = [{
    //     _id: '1',
    //     upVotes:3,
    //     downVotes:2,
    //     noofAnswers: 1,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"jan 2",
    //       usedId:2
    //     }]
    //   },{
    //     _id: '2',
    //     upVotes:3,
    //     downVotes:2,
    //     noofAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"jan 2",
    //       usedId:2
    //     }]
    //   },{
    //     _id: '3',
    //     upVotes:3,
    //     downVotes:2,
    //     noofAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"jan 2",
    //       usedId:2
    //     }]
    //   }
    // ]
    const location=useLocation()
    const url='http://localhost:3000'
    const dispatch=useDispatch()
    const [Answer, setAnswer] = useState('')
    const Navigate=useNavigate()
    const User=useSelector((state)=>(state.currentUserReducer))
    const handlePostAns=(e,answerLength)=>{
        if(User===null){
            alert('Login or signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer===''){
                alert("enter an answer before submitting")
            }
            else{
                dispatch(postAnswer({id,noofAnswers:answerLength+1,answerBody:Answer,userAnswered:User.result.name,userId:User.result._id}))
            }
        }
        
    }
    const handleShare = ()=>{
        copy(url+location.pathname)
        alert('Copied url: '+url+location.pathname)
    }
    const handleDelete=()=>{
        dispatch(deleteQuestion(id,Navigate))
    }
    const handleUpVote=()=>{
        dispatch(voteQuestion(id,'upvote',User.result._id))
    }
    const handleDownVote=()=>{
        dispatch(voteQuestion(id,'downvote',User.result._id))
    }
  return (
    <div className='question-details-page'>
        {
            questionsList.data===null? <h1>Loading....</h1>
            :<>
                {
                    questionsList.data.filter(question=>question._id===id).map(question=>(
                        <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className="question-votes">

                                            <img src={upvote} alt="upvote" width='18' className='votes-icon' onClick={handleUpVote}/>
                                            <p>{question.upVote.length-question.downVote.length}</p>
                                            <img src={downvote} alt="downvote" width='18' className='votes-icon' onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width:'100%'}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag)=>(
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }

                                            </div>
                                            <div className="question-actions-user">
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id===question?.userId&&
                                                            (<button type='button' onClick={handleDelete}>Delete</button>)
                                                        
                                                    }
                                                    
                                                </div>
                                                <div>
                                                    <p>asked{moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#008d68'}}>
                                                        <Avatar backgroundColor='orange' px='8px' py='5px'>
                                                            {question.userPosted.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </section>
                                {
                                    question.noofAnswers!==0&&(
                                            <section>
                                                <h3>{question.noofAnswers} Answers</h3>
                                                <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                            </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3 >
                                        Your Answer
                                    </h3>
                                    <form onSubmit={(e)=>{handlePostAns(e,question.answer.length)}}>
                                        <textarea name="" id="" cols="30" rows="10"  onChange={e=>setAnswer(e.target.value)}></textarea>
                                        <input type="submit" className='post-ans-btn' value='post your answer' />
                                    </form>
                                    <p>Brower other question tagged {question.questionTags.map((tag)=>(
                                        <Link to='Tags' key={tag} className='ans-tags'> {tag} </Link>
                                    ))} 
                                    or <Link to='/AskQuestion' style={{textDecoration:'none',color:'#009dff'}}> ask your own question.</Link>
                                    </p>

                                </section>
                        </div>
                    ))
                }
            </>
        }

    </div>
  )
}

export default QuestionsDetails