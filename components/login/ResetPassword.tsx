interface Props {
  closeModal: () => void
}

const ResetPassword: React.FC<Props> = ({ closeModal }) => {
  return (
    <div className="reset-password modal-container">
      <form onSubmit={() => alert('Password Reset!')}>
        <h2>Reset Password</h2>
        <img
          src={'/images/icon_x.svg'}
          className={'close-form'}
          onClick={closeModal}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Username..."
            name="username"
            required
          />
          <label htmlFor="Username">Username</label>
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email on file..."
            name="email"
            required
          />
          <label htmlFor="email">Email on file</label>
        </div>
        <button className="btn btn-primary login" type="submit">
          Reset Password
        </button>
        <p>
          For security purposes you are required to reset your password every
          120 days.
        </p>
        <p>
          {' '}
          If you do not receive an email with instructions on how to reset your
          password, please send an email to
          <span> vow@redbellre.com</span>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword
