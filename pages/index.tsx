import privateRoute from 'components/PrivateRoute'

const Home: React.FC = () => {
  return <div>test</div>
}

export default privateRoute(Home)
