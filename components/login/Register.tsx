import { useState } from 'react'
import Input from 'components/common/Input'
import { validateForm } from 'utils/validation'
import TermsOfUse from './TermsOfUse'

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

const Register: React.FC<Props> = ({ closeModal }) => {
  const [register, setRegister] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setRegister({ ...register, [key]: e.target.value })
  }

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(register)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      alert('Registration Complete!')
    }
    setError(errorCopy)
  }

  return (
    <div className="register modal-container">
      <div className="form">
        <h3 className="form-title">Create a New Account</h3>
        <img
          src={`${process.env.baseUrl}/images/icon_x.svg`}
          className={'close-form'}
          onClick={closeModal}
        />
        <form onSubmit={e => onRegister(e)}>
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
          <label htmlFor="terms_accepted" className="checkbox">
            <input
              type="checkbox"
              value={register.terms_accepted ? 'checked' : 'unchecked'}
              onChange={e =>
                setRegister({ ...register, terms_accepted: e.target.checked })
              }
            />
            I have read and agree to the Terms Of Use
          </label>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!register.terms_accepted}
          >
            Agree
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
