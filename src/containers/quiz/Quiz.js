import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{
    state = {
        results: {},  // {[id]: 'success/error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success/error'}
        quiz: [
            {   
                id:1,
                question: 'It is a question?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Yes', id:1},
                    {text: 'No', id:2},
                    {text: 'Maybe', id:3},
                    {text: 'Neither', id:4}
                ]
            },
            {   
                id:2,
                question: 'В каком году основали СПБ?',
                rightAnswerId: 3,
                answers: [
                    {text: '1456', id:1},
                    {text: '1289', id:2},
                    {text: '1909', id:3},
                    {text: '1703', id:4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {

        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]

            if(this.state.answerState[key] === 'success'){
                return
            }
        }
        
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId] : 'success'},
                results: results
            })

            const timeout = window.setTimeout(()=> {
                if(this.isQuizFinished()){  
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    }) 
                }
                window.clearTimeout(timeout)
            },1000)
           
        } else {
            results[question.id] = 'error'

            this.setState({
                answerState: {[answerId]: 'error'},
                results : results
            })
        }
        
    }
    //  is quiz finished?
    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0, 
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    componentDidMount(){
        console.log('Quiz id:' , this.props.match.params.id);
    }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes["QuizWrapper"]}>
                    <h1>QuizApp with React</h1>
                    {
                        this.state.isFinished 
                        ?
                            <FinishedQuiz
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                            <ActiveQuiz
                            question = {this.state.quiz[this.state.activeQuestion].question}
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick = {this.onAnswerClickHandler}
                            quizLength = {this.state.quiz.length}
                            answerNumber = {this.state.activeQuestion + 1}
                            state = {this.state.answerState}
                        />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz