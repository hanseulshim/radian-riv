import React, { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils'
import { submitResetPassword, submitAnswer } from 'api'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'

interface Props {
  closeModal: () => void
}

const defaultState = {
  username: '',
  email: ''
}

export default function ResetPassword({ closeModal }: Props) {
  const [resetPassword, setResetPassword] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [answerError, setAnswerError] = useState('')
  const [questionSuccess, setQuestionSuccess] = useState('')

  const onReset = async () => {
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(resetPassword)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        setAlert(null)
        const questionResponse = await submitResetPassword(resetPassword)
        setQuestion(questionResponse)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  const onAnswer = async () => {
    setAlert(null)
    if (answer.length === 0) {
      setAnswerError('Answer cannot be empty')
    } else {
      try {
        const message = await submitAnswer({
          ...resetPassword,
          question_num: question.question_num,
          answer
        })
        setQuestionSuccess(message)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setResetPassword({ ...resetPassword, [key]: e.target.value })
  }

  const updateAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerError('')
    setAnswer(e.target.value)
  }

  return (
    <Modal
      closeModal={closeModal}
      title={
        question === null
          ? 'Password Help'
          : questionSuccess
          ? 'Success!'
          : 'Security Question'
      }
      width={500}
    >
      {question === null ? (
        <Form id="reset-password" onSubmit={onReset} alert={alert}>
          <Input
            label="User Name"
            value={resetPassword.username}
            error={error.username}
            onChange={e => handleInput(e, 'username')}
            required
          />
          <Input
            label="Email on file"
            value={resetPassword.email}
            error={error.email}
            onChange={e => handleInput(e, 'email')}
            required
          />
          <button className="btn" type="submit">
            Reset Password
          </button>
          <p className="info">
            For security purposes you are required to reset your password every
            120 days. If you do not receive an email with instructions on how to
            reset your password, please send an email to{' '}
            <a href="mailto:vow@redbellre.com">vow@redbellre.com</a>
          </p>
        </Form>
      ) : questionSuccess ? (
        <div className="question-success">{questionSuccess}</div>
      ) : (
        <Form id="set-question" onSubmit={onAnswer} alert={alert}>
          <div className="question">{question.question_text}</div>
          <Input
            label="Answer"
            value={answer}
            error={answerError}
            onChange={updateAnswer}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Modal>
  )
}
