import { withoutAuth } from 'components/auth/AuthRoute'
import LoginForm from 'components/login/LoginForm'
import ResetPassword from 'components/login/ResetPassword'
import { useState } from 'react'

const Login: React.FC = () => {
  const [passwordModal, setPasswordModal] = useState(false)

  const toggleModal = () => {
    setPasswordModal(!passwordModal)
  }
  return (
    <div id="login-page">
      <div className="description">
        <h2>Welcome to Radian Interactive Value</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl, ipsum,
          malesuada fermentum, nisi, tortor ultrices suscipit. Urna in dignissim
          at viverra. Lectus ultricies suscipit ipsum eu quam faucibus mauris.
          At nisl commodo varius massa scelerisque. Augue posuere turpis turpis
          faucibus elementum, in eu varius. Risus volutpat vestibulum, pharetra,
          eget. Commodo tellus tempus, auctor sed. Ultrices euismod erat urna,
          lobortis. Turpis mus egestas pharetra facilisis arcu posuere semper.
        </p>
      </div>
      <LoginForm showPasswordModal={toggleModal} />
      {passwordModal && <ResetPassword closeModal={toggleModal} />}
    </div>
  )
}

export default withoutAuth(Login)
