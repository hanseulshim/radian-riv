import { withAuth } from 'components/auth/AuthRoute'
import Select from 'components/common/Select'
import { useState } from 'react'

const UserProfile: React.FC = () => {
  const [value, setValue] = useState<string | number>('')
  const onChange = (option: string | number) => {
    setValue(option)
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
