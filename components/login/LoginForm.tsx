interface Props {
  showPasswordModal: () => void
}

const LoginForm: React.FC<Props> = ({ showPasswordModal }) => {
  return (
    <div className="login-form">
      <form>
        <div className="input-group">
          <input
            type="email"
            placeholder="Username..."
            name="Username"
            required
          />
          <label htmlFor="Username">Username</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password..."
            name="Password"
            required
          />
          <label htmlFor="Password">Password</label>
        </div>
        <button className="btn btn-primary login" type="submit">
          Login
        </button>
        <a href="#" onClick={() => showPasswordModal()}>
          Forgot Password
        </a>
        <span>or</span>
        <button className="btn btn-secondary btn-small register">
          Register for free
        </button>
      </form>
    </div>
  )
}

export default LoginForm
