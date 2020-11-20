const LoginForm: React.FC = () => {
  return (
    <div className="login-form">
      <form>
        <input type="email" placeholder="Username..." />
        <input type="password" placeholder="Password" />
        <button className="btn btn-primary login">Login</button>
        <a href="#">Forgot Password</a>
        <span>or</span>
        <button className="btn btn-secondary btn-small register">
          Register for free
        </button>
      </form>
    </div>
  )
}

export default LoginForm
