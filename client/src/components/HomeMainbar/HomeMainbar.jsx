import React from 'react'
import {Link,useLocation} from 'react-router-dom'
import './HomeMainbar.css'
import Questions from './Questions'
import QuestionsList from './QuestionsList'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
const HomeMainbar = () => {

  const location=useLocation()
const user=1
const navigate=useNavigate()
//   var questionsList = [{
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
const questionsList=useSelector(state=>state.questionsReducer)
//console.log(questionsList)



const checkAuth=()=>{
      if(user===null){
        alert("login or signup to ask a question")
        navigate('/Auth')
      }
      else{
        navigate('/AskQuestion')
      }
}
  return (
    <div className='main-bar'>
         <div className='main-bar-header'>
            {
              location.pathname ==='/' ? <h1>Top Questions</h1>: <h1>All Questions</h1>
            }
            <button to='/AskQuestion' onClick={checkAuth} className='ask-btn'>Ask Question</button>

         </div>
         <div>
            {
              questionsList.data === null ?
              <h1>Loading...</h1> :
               <>
               <p>{questionsList.data.length} questions</p>
              <QuestionsList questionsList={questionsList.data} />
        
              </>
            }
         </div>
        
    </div>
  )
}

export default HomeMainbar