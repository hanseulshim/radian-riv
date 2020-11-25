/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const emailValidation = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
const phoneValidation = /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/gim

export const validateForm = (form: any): any => {
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
    } else if (key === 'name_first') {
      if (form[key].length === 0) {
        errorObj[key] = `First Name can't be empty`
      }
    } else if (key === 'name_last') {
      if (form[key].length === 0) {
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
      if (!form[key].match(phoneValidation)) {
        errorObj[key] = 'Must be a valid phone number format'
      }
    }
  })
  return errorObj
}
