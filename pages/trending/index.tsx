import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useTrending } from 'context/trending/TrendingProvider'
import { getStateRoutes } from 'utils'

function Trending() {
  const { stateList } = useTrending()
  return (
    <Sidebar routes={getStateRoutes(stateList)} label="Trending" parentPath="/">
      <div className="container trending">
        <Breadcrumbs current="National Level" />
        <h1>National Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
      </div>
    </Sidebar>
  )
}

export default withAuth(Trending)
