import React, { useEffect, useState } from 'react'
import {
  getDefaultSearchDepartments,
  getDefaultSearchDepartment,
  setDefaultSearchDepartment
} from 'api'
import Select from 'components/common/Select'
import { useAuth } from 'components/auth/AuthProvider'

const defaultSearchState = {
  department: null
}

interface Option {
  label: string
  value: number | string
}

const SearchDefaults: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [searchDefaults, setSearchDefaults] = useState({
    ...defaultSearchState
  })
  const [departments, setDepartments] = useState<Option[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchUserDefaults = async () => {
      try {
        const { userid_ssid } = user
        const defaults = await getDefaultSearchDepartment(userid_ssid)
        setSearchDefaults({
          department: defaults
        })
      } catch (e) {
        setErrorMessage(e.message)
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
        setErrorMessage(e.message)
      }
    }
    fetchDepartments()
  }, [])

  const submitDefaults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    try {
      const { userid_ssid } = user
      const message = await setDefaultSearchDepartment({
        userid_ssid,
        department_id: searchDefaults.department.value
      })
      setSuccessMessage(message)
    } catch (e) {
      setErrorMessage(e.message)
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
        <form onSubmit={submitDefaults}>
          <div className="search-defaults-container">
            <Select
              options={departments}
              value={searchDefaults.department}
              onChange={item => handleSelect(item, 'department')}
              label="Department (Search)"
              placeholder="Select Department"
            />
          </div>
          <span
            className={successMessage ? 'success-message' : 'error-message'}
          >
            {successMessage || errorMessage}
          </span>
          <button className="btn btn-secondary btn-small">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SearchDefaults
