import { withAuth } from 'components/auth/AuthRoute'
import AveFilterDefaults from 'components/my-account/AveFilterDefaults'
import SearchDefaults from 'components/my-account/SearchDefaults'
import SubjectPropertyDefaults from 'components/my-account/SubjectPropertyDefaults'
import SidebarLayout from 'components/sidebar'

function FilterDefaults() {
  return (
    <SidebarLayout group="Account">
      <div className={'container filter-defaults'}>
        <AveFilterDefaults />
        <SearchDefaults />
        <SubjectPropertyDefaults />
      </div>
    </SidebarLayout>
  )
}

export default withAuth(FilterDefaults)
