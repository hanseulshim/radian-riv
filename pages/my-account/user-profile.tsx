import { withAuth } from 'components/auth/AuthRoute'
import Select from 'components/common/Select'
import { useState } from 'react'

const UserProfile: React.FC = () => {
  const [value, setValue] = useState('')
  const onChange = (option: string) => {
    setValue(option)
  }
  return (
    <div>
      <p>User profile</p>
      <Select
        placeholder="Select ..."
        options={['one hundred million pesos', 'two', 'three']}
        onChange={onChange}
        value={value}
        label="Field Label"
      />
    </div>
  )
}

export default withAuth(UserProfile)
