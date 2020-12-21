import { withAuth } from 'components/auth/AuthRoute'
import AveFilterDefaults from 'components/my-account/AveFilterDefaults'
import SearchDefaults from 'components/my-account/SearchDefaults'
import SubjectPropertyDefaults from 'components/my-account/SubjectPropertyDefaults'

function FilterDefaults() {
  return (
    <div className={'container filter-defaults'}>
      <AveFilterDefaults />
      <SearchDefaults />
      <SubjectPropertyDefaults />
    </div>
  )
}

export default withAuth(FilterDefaults)
