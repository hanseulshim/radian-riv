import { useEffect, useState } from 'react'
import {
  getDefaultSearchDepartments,
  getDefaultSearchDepartment,
  setDefaultSearchDepartment
} from 'api'
import { useAuth } from 'components/auth/AuthProvider'
import CustomSelect from 'components/common/CustomSelect'
import Form from 'components/common/Form'

const defaultSearchState = {
  department: null
}

interface Option {
  label: string
  value: number | string
}

function SearchDefaults() {
  const {
    auth: { user }
  } = useAuth()
  const [searchDefaults, setSearchDefaults] = useState({
    ...defaultSearchState
  })
  const [departments, setDepartments] = useState<Option[]>([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const fetchUserDefaults = async () => {
      try {
        const { userid_ssid } = user
        const defaults = await getDefaultSearchDepartment(userid_ssid)
        setSearchDefaults({
          department: defaults
        })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    fetchUserDefaults()
  }, [])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { userid_ssid } = user
        const options = await getDefaultSearchDepartments(userid_ssid)
        setDepartments(options)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    fetchDepartments()
  }, [])

  const submitDefaults = async () => {
    setAlert(null)
    try {
      const { userid_ssid } = user
      const message = await setDefaultSearchDepartment({
        userid_ssid,
        department_id: searchDefaults.department.value
      })
      setAlert({ type: 'success', message: message })
    } catch (e) {
      setAlert({ type: 'error', message: e.message })
    }
  }

  const handleSelect = (item: Option, selectedKey: string) => {
    const stateCopy = { ...searchDefaults }
    stateCopy[selectedKey] = item
    setSearchDefaults(stateCopy)
  }

  return (
    <div>
      <h1>Search Defaults</h1>
      <div className="form">
        <Form id="search-defaults" onSubmit={submitDefaults} alert={alert}>
          <div className="search-defaults-container">
            <CustomSelect
              options={departments}
              value={searchDefaults.department}
              onChange={e => handleSelect(e, 'department')}
              label="Department (Search)"
              placeholder="Select Department"
              className="custom-select"
            />
          </div>
          <button className="btn btn-secondary btn-small">Submit</button>
        </Form>
      </div>
    </div>
  )
}

export default SearchDefaults
