import React, { useEffect, useState } from 'react'
import {
  getDefaultSearchDepartments,
  getDefaultSearchDepartment,
  setDefaultSearchDepartment
} from 'api'
import Select from 'components/common/Select'
import { validateForm } from 'utils/validation'
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
  const [error, setError] = useState({ ...defaultSearchState })
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
    const errorCopy = { ...defaultSearchState }
    const errorObj = validateForm(searchDefaults)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
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
    setError(errorCopy)
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
