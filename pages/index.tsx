import { withAuth } from 'components/auth/AuthRoute'
import Sidebar from 'components/Sidebar'
import { rootRoutes } from 'utils'

function Main() {
  return (
    <div id="main">
      <Sidebar parent routes={rootRoutes} />
      <div id="home-page">
        <img
          src={`${process.env.baseUrl}/images/house.png`}
          alt="RIV-Background"
          className="background-image"
        />
        <div className="container">
          <h1>Welcome to Radian Interactive Value</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl,
            ipsum, malesuada fermentum, nisi, tortor ultrices suscipit. Urna in
            dignissim at viverra. Lectus ultricies suscipit ipsum eu quam
            faucibus mauris. At nisl commodo varius massa scelerisque. Augue
            posuere turpis turpis faucibus elementum, in eu varius. Risus
            volutpat vestibulum, pharetra, eget. Commodo tellus tempus, auctor
            sed. Ultrices euismod erat urna, lobortis. Turpis mus egestas
            pharetra facilisis arcu posuere semper.
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Main)
