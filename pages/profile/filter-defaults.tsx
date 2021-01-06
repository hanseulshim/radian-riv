import ProfileLayout from 'components/layouts/ProfileLayout'
import AveFilterDefaults from 'components/my-account/AveFilterDefaults'
import SearchDefaults from 'components/my-account/SearchDefaults'
import SubjectPropertyDefaults from 'components/my-account/SubjectPropertyDefaults'

export default function FilterDefaults() {
  return (
    <ProfileLayout label="Filter Defaults" className="filter-defaults">
      <AveFilterDefaults />
      <SearchDefaults />
      <SubjectPropertyDefaults />
    </ProfileLayout>
  )
}
