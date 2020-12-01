import { withAuth } from 'components/auth/AuthRoute'

const FilterDefaults: React.FC = () => {
  return (
    <div className="container filter-defaults">
      <h1>Change Filter Defaults</h1>
    </div>
  )
}

export default withAuth(FilterDefaults)
