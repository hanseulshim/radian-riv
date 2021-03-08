import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import { useTrending } from 'context/TrendingProvider'
import { getStateRoutes } from 'utils'
import UnitedStatesMap from 'components/trending/UnitedStatesMap'

function Trending() {
  const { stateList } = useTrending()
  return (
    <div id="main">
      <div className="content trending">
        <Breadcrumbs
          routes={getStateRoutes(stateList)}
          label="Trending"
          current="National Level"
          parentPath="/"
        />
        <h1>National Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
        <UnitedStatesMap />
      </div>
    </div>
  )
}

export default withAuth(Trending)
