import { withAuth } from 'components/auth/AuthRoute'
import Select from 'components/common/Select'
import { useState } from 'react'

interface item {
  label: string
  value: number | string
}

const UserProfile: React.FC = () => {
  const [value, setValue] = useState<item>(null)
  const onChange = (item: item) => {
    setValue(item)
  }
  return (
    <div>
      <p>User profile</p>
      <Select
        placeholder="Select ..."
        options={[
          {
            label: 'one',
            value: 1
          },
          {
            label: 'two',
            value: 2
          }
        ]}
        onChange={onChange}
        value={value}
        label="Field Label"
      />
    </div>
  )
}

export default withAuth(UserProfile)
