import React, { useEffect, useState } from 'react'
import { getDepartments, getSearchDefaults, sendSearchDefaults } from 'api'
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
    // const fetchDefaults = async () => {
    //   try {
    //     const defaults = await getSearchDefaults()
    //     setSearchDefaults({
    //       department: defaults.department || null
    //     })
    //   } catch (e) {
    //     setErrorMessage(e.message)
    //   }
    // }
    // fetchDefaults()
  }, [])

  useEffect(() => {
    // const fetchDepartments = async () => {
    //   try {
    //     const options = await getDepartments()
    //     setDepartments(options)
    //   } catch (e) {
    //     setErrorMessage(e.message)
    //   }
    // }
    // fetchDepartments()
  }, [])

  const submitDefaults = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    // setErrorMessage('')
    // setSuccessMessage('')
    // const errorCopy = { ...defaultSearchState }
    // const errorObj = validateForm(searchDefaults)
    // const errorArr = Object.keys(errorObj)
    // if (errorArr.length) {
    //   errorArr.forEach(key => {
    //     errorCopy[key] = errorObj[key]
    //   })
    // } else {
    //   try {
    //     const message = await sendSearchDefaults(searchDefaults)
    //     setSuccessMessage(message)
    //   } catch (e) {
    //     setErrorMessage(e.message)
    //   }
    // }
    // setError(errorCopy)
  }

  const handleSelect = (item: Option, selectedKey: string) => {
    // const stateCopy = { ...searchDefaults }
    // stateCopy[selectedKey] = item
    // setSearchDefaults(stateCopy)
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
