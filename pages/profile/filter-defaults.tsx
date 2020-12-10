import { withAuth } from 'components/auth/AuthRoute'
import AveFilterDefaults from 'components/my-account/AveFilterDefaults'
import SearchDefaults from 'components/my-account/SearchDefaults'
import SubjectPropertyDefaults from 'components/my-account/SubjectPropertyDefaults'
import React from 'react'

const FilterDefaults: React.FC = () => {
  return (
    <div className={'container filter-defaults'}>
      <AveFilterDefaults />
      <SearchDefaults />
      <SubjectPropertyDefaults />
    </div>
  )
}

export default withAuth(FilterDefaults)
