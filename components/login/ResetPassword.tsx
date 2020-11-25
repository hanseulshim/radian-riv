import { useState } from 'react'
import Input from 'components/common/Input'

interface Props {
  closeModal: () => void
}

const ResetPassword: React.FC<Props> = ({ closeModal }) => {
  const [resetPassword, setResetPassword] = useState({
    username: '',
    email: ''
  })

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Password Reset!')
  }

  return (
    <div className="reset-password modal-container">
      <div className="form">
        <h2>Reset Password</h2>
        <img
          src={`${process.env.baseUrl}/images/icon_x.svg`}
          className={'close-form'}
          onClick={closeModal}
        />
        <form onSubmit={e => onReset(e)}>
          <Input
            label="User Name"
            value={resetPassword.username}
            onChange={e =>
              setResetPassword({ ...resetPassword, username: e.target.value })
            }
            required
          />
          <Input
            label="Email on file"
            value={resetPassword.email}
            onChange={e =>
              setResetPassword({ ...resetPassword, email: e.target.value })
            }
            required
          />
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
      </div>
    </div>
  )
}

export default ResetPassword
