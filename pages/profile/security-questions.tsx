import { getSecurityQuestions, setSecurityQuestions } from 'api'
import { useAuth } from 'components/auth/AuthProvider'
import CustomSelect from 'components/common/CustomSelect'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import ProfileLayout from 'components/layouts/ProfileLayout'
import { useEffect, useState } from 'react'
import { validateForm } from 'utils'

interface Question {
  label: string
  value: string | number
}

const defaultAnswerState = { answer1: '', answer2: '', answer3: '' }
const defaultQuestionState = {
  question1: null,
  question2: null,
  question3: null
}

export default function SecurityQuestions() {
  const {
    auth: { user }
  } = useAuth()
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [questions, setQuestions] = useState({ ...defaultQuestionState })
  const [answers, setAnswers] = useState({ ...defaultAnswerState })
  const [error, setError] = useState({ ...defaultAnswerState })
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const securityQuestionFetch = async () => {
      try {
        const securityQuestions = await getSecurityQuestions()
        setQuestionList(securityQuestions)
        if (securityQuestions.length > 2) {
          setQuestions({
            question3: securityQuestions[2],
            question2: securityQuestions[1],
            question1: securityQuestions[0]
          })
        } else if (securityQuestions.length > 1) {
          setQuestions({
            ...questions,
            question2: securityQuestions[1],
            question1: securityQuestions[0]
          })
        } else if (securityQuestions.length) {
          setQuestions({ ...questions, question1: securityQuestions[0] })
        }
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    securityQuestionFetch()
  }, [])

  const submitQuestions = async () => {
    setAlert(null)
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
        setAlert({ type: 'success', message })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
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
    <ProfileLayout label="Security Questions" className="security-questions">
      <h1>Change Security Questions</h1>
      <div className="form">
        <Form id="security-questions" onSubmit={submitQuestions} alert={alert}>
          <h3>
            Please select three security questions and provide answers below:
          </h3>
          <div className="question-container">
            <CustomSelect
              options={questionList}
              value={questions.question1}
              onChange={item => handleSelect(item, 'question1')}
            />
            <Input
              value={answers.answer1}
              error={error.answer1}
              onChange={e => handleInput(e, 'answer1')}
            />
            <CustomSelect
              options={questionList}
              value={questions.question2}
              onChange={item => handleSelect(item, 'question2')}
            />
            <Input
              value={answers.answer2}
              error={error.answer2}
              onChange={e => handleInput(e, 'answer2')}
            />
            <CustomSelect
              options={questionList}
              value={questions.question3}
              onChange={item => handleSelect(item, 'question3')}
            />
            <Input
              value={answers.answer3}
              error={error.answer3}
              onChange={e => handleInput(e, 'answer3')}
            />
            <div>
              <button className="btn btn-secondary btn-small">Submit</button>
            </div>
          </div>
        </Form>
      </div>
    </ProfileLayout>
  )
}
