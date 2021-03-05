/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const emailValidation = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
const phoneValidation = /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/gim
const dateValidation = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
const yearValidation = /^\d{4}$/

export const validateEmail = (
  email: string,
  required: boolean = false
): string => {
  if (email.length === 0) {
    if (required) {
      return `Email can't be empty`
    } else return ''
  } else if (!email.match(emailValidation)) {
    return `Email must be valid`
  }
  return ''
}

export const validateForm = (form: any, reqFields: any = {}): any => {
  const errorObj = {}
  Object.keys(form).forEach(key => {
    if (key === 'username') {
      if (form[key].length === 0) {
        errorObj[key] = `Username can't be empty`
      }
    } else if (key === 'pwd') {
      if (form[key].length === 0) {
        errorObj[key] = `Password can't be empty`
      }
    } else if (key === 'confirmPwd') {
      if (form[key].length === 0) {
        errorObj[key] = `Password can't be empty`
      } else if (form[key] !== form.pwd) {
        errorObj[key] = `Confirm password must match password`
      }
    } else if (key === 'name_first') {
      if (reqFields[key] && form[key].length === 0) {
        errorObj[key] = `First Name can't be empty`
      }
    } else if (key === 'name_last') {
      if (reqFields[key] && form[key].length === 0) {
        errorObj[key] = `Last Name can't be empty`
      }
    } else if (key === 'email') {
      if (form[key].length === 0) {
        errorObj[key] = `Email can't be empty`
      } else if (!form[key].match(emailValidation)) {
        errorObj[key] = `Email must be valid`
      }
    } else if (key === 'confirm_email') {
      if (form[key].length === 0) {
        errorObj[key] = `Confirm Email can't be empty`
      } else if (!form[key].match(emailValidation)) {
        errorObj[key] = `Confirm Email must be valid`
      } else if (form[key] !== form.email) {
        errorObj[key] = `Confirm Email must match email`
      }
    } else if (
      key === 'phone_home' ||
      key === 'phone_mobile' ||
      key === 'phone_office'
    ) {
      if (form[key] && !form[key].match(phoneValidation)) {
        errorObj[key] = 'Must be a valid phone number format'
      }
    } else if (key === 'answer1' || key === 'answer2' || key === 'answer3') {
      if (form[key].length === 0) {
        errorObj[key] = `Answer can't be blank`
      }
    } else if (
      key === 'date' ||
      key === 'asOfDate' ||
      key === 'orderDateFrom' ||
      key === 'orderDateTo'
    ) {
      if (form[key].length === 0) {
        errorObj[key] = `Date can't be empty`
      } else if (!form[key].match(dateValidation)) {
        errorObj[key] = `Date must be valid (MM/DD/YYYY)`
      }
    } else if (key === 'year') {
      if (form[key].length && !form[key].match(yearValidation)) {
        errorObj[key] = `Date must be valid (YYYY)`
      }
    } else if (key === 'filename') {
      if (form[key].length === 0) {
        errorObj[key] = `Filename can't be empty`
      }
    }
  })
  return errorObj
}
