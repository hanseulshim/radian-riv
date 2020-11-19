import { withoutAuth } from 'components/auth/AuthRoute'
import LoginForm from 'components/login/LoginForm'
import styles from './styles/login.module.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
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
      <LoginForm />
    </div>
  )
}

export default withoutAuth(Login)
