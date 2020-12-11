import { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import { submitResetPassword, getUserQuestion, submitAnswer } from 'api'
import Modal from 'components/common/Modal'

interface Props {
  closeModal: () => void
}

const defaultState = {
  username: '',
  email: ''
}

const ResetPassword: React.FC<Props> = ({ closeModal }) => {
  const [resetPassword, setResetPassword] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [answerError, setAnswerError] = useState('')
  const [userId, setUserId] = useState('')

  const onReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(resetPassword)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const userid_ssid = await submitResetPassword(resetPassword)
        const questionResponse = await getUserQuestion(userid_ssid)
        setUserId(userid_ssid)
        setQuestion(questionResponse)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  const onAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (answer.length === 0) {
      setAnswerError('Answer cannot be empty')
    } else {
      try {
        const message = await submitAnswer({
          userid_ssid: userId,
          question_id: question.question_id,
          answer
        })
        setSuccessMessage(message)
      } catch (e) {
        setErrorMessage(e.message)
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
      title={question === null ? 'Reset Password' : 'Security Question'}
      width={500}
    >
      {question === null ? (
        <form className="reset-password" onSubmit={onReset}>
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
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
          <p className="info">
            For security purposes you are required to reset your password every
            120 days.
          </p>
          <p className="info">
            If you do not receive an email with instructions on how to reset
            your password, please send an email to{' '}
            <a href="mailto:vow@redbellre.com">vow@redbellre.com</a>
          </p>
        </form>
      ) : (
        <form className="reset-password" onSubmit={onAnswer}>
          <div className="question">{question.question_text}</div>
          <Input
            label="Answer"
            value={answer}
            error={answerError}
            onChange={updateAnswer}
          />
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </form>
      )}
    </Modal>
  )
}

export default ResetPassword
