import { useState } from 'react'
import Input from 'components/common/Input'
import TermsOfUse from './TermsOfUse'

interface Props {
  closeModal: () => void
}

const Register: React.FC<Props> = ({ closeModal }) => {
  const [register, setRegister] = useState({
    name_first: '',
    name_last: '',
    username: '',
    email: '',
    confirm_email: '',
    phone_mobile: '',
    terms_accepted: true
  })

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Registration Complete!')
  }

  return (
    <div className="register modal-container">
      <div className="form">
        <h2>Create a New Account</h2>
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
                onChange={e =>
                  setRegister({ ...register, name_first: e.target.value })
                }
                required
              />
              <Input
                label="Last Name"
                value={register.name_last}
                onChange={e =>
                  setRegister({ ...register, name_last: e.target.value })
                }
                required
              />
              <Input
                label="User Name"
                value={register.username}
                onChange={e =>
                  setRegister({ ...register, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <Input
                label="Phone"
                value={register.phone_mobile}
                onChange={e =>
                  setRegister({ ...register, phone_mobile: e.target.value })
                }
              />
              <Input
                label="Email"
                value={register.email}
                onChange={e =>
                  setRegister({ ...register, email: e.target.value })
                }
                required
              />
              <Input
                label="Confirm Email"
                value={register.confirm_email}
                onChange={e =>
                  setRegister({ ...register, confirm_email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <TermsOfUse />
          <button className="btn btn-primary" type="submit">
            Agree
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
