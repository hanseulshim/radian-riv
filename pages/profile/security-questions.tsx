import { withAuth } from 'components/auth/AuthRoute'

const SecurityQuestions: React.FC = () => {
  return (
    <div className="container security-questions">
      <h1>Change Security Questions</h1>
    </div>
  )
}

export default withAuth(SecurityQuestions)
