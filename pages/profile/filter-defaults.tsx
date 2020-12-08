import { withAuth } from 'components/auth/AuthRoute'
import AveFilterDefaults from 'components/my-account/AveFilterDefaults'
import React from 'react'

const FilterDefaults: React.FC = () => {
  return (
    <div>
      <AveFilterDefaults />
    </div>
  )
}

export default withAuth(FilterDefaults)
