import React, { useEffect, useState } from 'react'
import { getSecurityQuestions } from 'api'
import { withAuth } from 'components/auth/AuthRoute'
import Select from 'components/common/Select'
import Input from 'components/common/Input'
import { setSecurityQuestions } from 'api'
import { validateForm } from 'utils/validation'
import { useAuth } from 'components/auth/AuthProvider'

interface Question {
  label: string
  value: number
}

const defaultAnswerState = { answer1: '', answer2: '', answer3: '' }
const defaultQuestionState = {
  question1: null,
  question2: null,
  question3: null
}

const SecurityQuestions: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [questions, setQuestions] = useState({ ...defaultQuestionState })
  const [answers, setAnswers] = useState({ ...defaultAnswerState })
  const [error, setError] = useState({ ...defaultAnswerState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const securityQuestionFetch = async () => {
      const securityQuestions = await getSecurityQuestions()
      const mappedQuestions = securityQuestions.map(
        ({ questionid, question_text }) => ({
          label: question_text,
          value: questionid
        })
      )
      setQuestionList(mappedQuestions)
      if (mappedQuestions.length > 2) {
        setQuestions({
          question3: mappedQuestions[2],
          question2: mappedQuestions[1],
          question1: mappedQuestions[0]
        })
      } else if (mappedQuestions.length > 1) {
        setQuestions({
          ...questions,
          question2: mappedQuestions[1],
          question1: mappedQuestions[0]
        })
      } else if (mappedQuestions.length) {
        setQuestions({ ...questions, question1: mappedQuestions[0] })
      }
    }
    securityQuestionFetch()
  }, [])

  const submitQuestions = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultAnswerState }
    const errorObj = validateForm(answers)
    const errorArr = Object.keys(errorObj)

    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const form = {
          userid_ssid: user.userid_ssid,
          question1id: questions.question1 ? questions.question1.value : null,
          answer1: answers.answer1,
          question2id: questions.question2 ? questions.question2.value : null,
          answer2: answers.answer2,
          question3id: questions.question3 ? questions.question3.value : null,
          answer3: answers.answer3
        }
        const message = await setSecurityQuestions(form)
        setSuccessMessage(message)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  const handleSelect = (item: Question, selectedKey: string) => {
    const questionsCopy = { ...questions }
    for (const [key, value] of Object.entries(questions)) {
      if (selectedKey !== key && value && item.value === value.value) {
        questionsCopy[key] = null
      }
    }
    questionsCopy[selectedKey] = item
    setQuestions(questionsCopy)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setAnswers({ ...answers, [key]: e.target.value })
  }

  return (
    <div className="container security-questions">
      <h1>Change Security Questions</h1>
      <div className="form">
        <form onSubmit={submitQuestions}>
          <h3>
            Please select three security questions and provide answers below:
          </h3>
          <div className="question-container">
            <Select
              options={questionList}
              value={questions.question1}
              onChange={item => handleSelect(item, 'question1')}
            />
            <Input
              value={answers.answer1}
              error={error.answer1}
              onChange={e => handleInput(e, 'answer1')}
            />
            <Select
              options={questionList}
              value={questions.question2}
              onChange={item => handleSelect(item, 'question2')}
            />
            <Input
              value={answers.answer2}
              error={error.answer2}
              onChange={e => handleInput(e, 'answer2')}
            />
            <Select
              options={questionList}
              value={questions.question3}
              onChange={item => handleSelect(item, 'question3')}
            />
            <Input
              value={answers.answer3}
              error={error.answer3}
              onChange={e => handleInput(e, 'answer3')}
            />
            <span
              className={successMessage ? 'success-message' : 'error-message'}
            >
              {successMessage || errorMessage}
            </span>
            <button className="btn btn-secondary btn-small">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(SecurityQuestions)
