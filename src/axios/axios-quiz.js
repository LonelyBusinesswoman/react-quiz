import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-64658.firebaseio.com/'
})