import React, { useEffect, useState } from 'react'
import { getSubjectPropertyDefaults, setSubjectPropertyDefault } from 'api'
import Select from 'components/common/Select'
import { validateForm } from 'utils/validation'
import { useAuth } from 'components/auth/AuthProvider'

interface Option {
  label: string
  value: number | string
}

const defaultSearchState = {
  property: null
}

const SubjectPropertyDefaults: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [selectedDefault, setSelectedDefault] = useState({
    ...defaultSearchState
  })
  const [subjectPropertyDefaults, setSubjectPropertyDefaults] = useState<
    Option[]
  >([])
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
    // const fetchSubjectPropertyDefaults = async () => {
    //   try {
    //     const { userid_ssid } = user
    //     const options = await getSubjectPropertyDefaults({ userid_ssid })
    //     setSubjectPropertyDefaults(options)
    //   } catch (e) {
    //     setErrorMessage(e.message)
    //   }
    // }
    // fetchSubjectPropertyDefaults()
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
    const stateCopy = { ...selectedDefault }
    stateCopy[selectedKey] = item
    setSelectedDefault(stateCopy)
  }

  return (
    <div>
      <h1>Subject Property - as comparable</h1>
      <div className="form">
        <form onSubmit={submitDefaults}>
          <div className="subject-property-defaults-container">
            <Select
              options={subjectPropertyDefaults}
              value={selectedDefault.property}
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

export default SubjectPropertyDefaults
