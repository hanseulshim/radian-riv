import { withAuth } from 'components/auth/AuthRoute'
import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCurrentCounty, getTrendingRoutes, Route } from 'utils'

interface Props {
  children: React.ReactNode
  label: string
}

function CountyLayout({ children, label }: Props) {
  const [currentState, setCurrentState] = useState<Route>(null)
  const [currentCounty, setCurrentCounty] = useState<Route>(null)
  const router = useRouter()
  const { state, county } = router.query
  useEffect(() => {
    const currentCounty = async () => {
      if (state && county) {
        //TODO: Add try/catch
        const currentCounty = await getCurrentCounty(
          state as string,
          county as string
        )
        setCurrentState(currentCounty.currentState)
        setCurrentCounty(currentCounty.currentCounty)
      }
    }
    currentCounty()
  }, [state, county])
  return currentCounty ? (
    <Sidebar
      routes={getTrendingRoutes(currentState, currentCounty)}
      label={currentCounty.label}
      parentPath={`/trending/${currentState.value}`}
    >
      <div className="container trending">
        <Breadcrumbs
          current={`${currentCounty.label} County ${label}`}
          parents={[
            { path: '/trending', name: 'National Level' },
            {
              path: `/trending/${state}`,
              name: `${currentState.label} County Level`
            }
          ]}
        />
        <h1>{currentCounty.label} County Real Estate Trending</h1>
        <h2>{label}</h2>
        {children}
      </div>
    </Sidebar>
  ) : null
}

export default withAuth(CountyLayout)
