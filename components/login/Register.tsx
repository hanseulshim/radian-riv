import TermsOfUse from './TermsOfUse'

interface Props {
  closeModal: () => void
}

const Register: React.FC<Props> = ({ closeModal }) => {
  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Registration Complete!')
  }

  return (
    <div className="register modal-container">
      <form onSubmit={e => onRegister(e)}>
        <h2>Create a New Account</h2>
        <img
          src={`${process.env.baseUrl}/images/icon_x.svg`}
          className={'close-form'}
          onClick={closeModal}
        />
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name..."
              name="firstname"
              required
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Phone..." name="phone" />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Last Name..."
              name="lastname"
              required
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email on file..."
              name="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="User Name..."
              name="username"
              required
            />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Confirm Email"
              name="confirmEmail"
              required
            />
            <label htmlFor="confirmEmail">Confirm Email</label>
          </div>
        </div>
        <h5>Terms of Use:</h5>
        <TermsOfUse />
        <button className="btn btn-primary" type="submit">
          Agree
        </button>
      </form>
    </div>
  )
}

export default Register
