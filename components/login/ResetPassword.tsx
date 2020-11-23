const ResetPassword: React.FC = () => {
  return (
    <div className="reset-password modal-container">
      <form>
        <h2>Reset Password</h2>
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
      </form>
    </div>
  )
}

export default ResetPassword
