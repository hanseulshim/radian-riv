import React, { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils'
import TermsOfUse from './TermsOfUse'
import { submitRegister } from 'api'
import Modal from 'components/common/Modal'
import Checkbox from 'components/common/Checkbox'
import Form from 'components/common/Form'

interface Props {
  closeModal: () => void
}

const defaultState = {
  name_first: '',
  name_last: '',
  username: '',
  email: '',
  confirm_email: '',
  phone_mobile: '',
  terms_accepted: false
}

const reqFields = {
  name_first: true,
  name_last: true
}

export default function Register({ closeModal }: Props) {
  const [register, setRegister] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setRegister({ ...register, [key]: e.target.value })
  }

  const onRegister = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(register, reqFields)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = await submitRegister({
          name_first: register.name_first,
          name_last: register.name_last,
          username: register.username,
          email: register.email,
          phone_mobile: register.phone_mobile
        })
        setAlert({ type: 'success', message })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <Modal closeModal={closeModal} title="Create a New Account" width={800}>
      <Form id="register" onSubmit={onRegister} alert={alert}>
        <div className="form-row">
          <div className="form-group">
            <Input
              label="First Name"
              value={register.name_first}
              error={error.name_first}
              onChange={e => handleInput(e, 'name_first')}
              required
            />
            <Input
              label="Last Name"
              value={register.name_last}
              error={error.name_last}
              onChange={e => handleInput(e, 'name_last')}
              required
            />
            <Input
              label="User Name"
              value={register.username}
              error={error.username}
              onChange={e => handleInput(e, 'username')}
              required
            />
          </div>
          <div className="form-group">
            <Input
              label="Phone"
              value={register.phone_mobile}
              error={error.phone_mobile}
              onChange={e => handleInput(e, 'phone_mobile')}
            />
            <Input
              label="Email"
              value={register.email}
              error={error.email}
              onChange={e => handleInput(e, 'email')}
              required
            />
            <Input
              label="Confirm Email"
              value={register.confirm_email}
              error={error.confirm_email}
              onChange={e => handleInput(e, 'confirm_email')}
              required
            />
          </div>
        </div>
        <TermsOfUse />
        <Checkbox
          label="I have read and agree to the Terms Of Use"
          checked={register.terms_accepted}
          onChange={e =>
            setRegister({ ...register, terms_accepted: e.target.checked })
          }
        />
        <button
          className="btn"
          type="submit"
          disabled={!register.terms_accepted}
        >
          Agree
        </button>
      </Form>
    </Modal>
  )
}
