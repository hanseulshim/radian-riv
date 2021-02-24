import Cookies from 'js-cookie'
import { handleApi } from './index'

interface Login {
  username: string
  pwd: string
}
export const submitLogin = async (form: Login): Promise<void> => {
  const { token } = await handleApi('/auth/login', form, true)
  const user = await handleApi('/user/get', null, true, token)
  const auth = {
    token,
    user
  }
  Cookies.set('auth', auth)
}

interface ResetPassword {
  username: string
  email: string
}

interface QuestionInfo {
  question_text: string
  question_num: number
}

export const submitResetPassword = async (
  form: ResetPassword
): Promise<QuestionInfo> => {
  const data = await handleApi('/auth/reset', form, true)
  return data
}

interface Answer {
  username: string
  email: string
  question_num: number
  answer: string
}

export const submitAnswer = async (form: Answer): Promise<string> => {
  const data = await handleApi('/auth/answer', form, true)
  return data
}

interface Register {
  name_first: string
  name_last: string
  username: string
  email: string
  phone_mobile: string
}

export const submitRegister = async (form: Register): Promise<string> => {
  const data = await handleApi('/auth/register', form, true)
  return data
}

export const submitChangePassword = async (pwd: string): Promise<string> => {
  if (pwd.length < 8) {
    throw new Error('Password must be at least 8 characters(s) long')
  } else if (!/[A-Z]/.test(pwd)) {
    throw new Error('Password must contain an uppercase character')
  } else if (!/[a-z]/.test(pwd)) {
    throw new Error('Password must contain a lowercase character')
  } else if (!/[0-9]/.test(pwd)) {
    throw new Error('Password must contain a numeric character')
  } else if (!/[!@#$]/.test(pwd)) {
    throw new Error(
      'Password must contain a special character (example: !,@,#,$)'
    )
  }
  const data = await handleApi('/auth/pwdchange', { pwd })
  return data
}

interface Question {
  label: string
  value: string
}
export const getSecurityQuestions = async (): Promise<Question[]> => {
  const questions = await handleApi('/auth/questions')
  return questions.map(question => ({
    label: question.question_text,
    value: question.questionid
  }))
}

interface SecurityQuestions {
  question1id: number
  answer1: string
  question2id: number
  answer2: string
  question3id: number
  answer3: string
}

export const setSecurityQuestions = async (
  form: SecurityQuestions
): Promise<string> => {
  if (
    form.question1id === null ||
    form.question2id === null ||
    form.question3id === null
  ) {
    throw new Error(`Questions can't be blank`)
  }
  const data = await handleApi('/auth/questionset', form)
  return data
}
