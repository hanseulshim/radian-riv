import React, { useEffect, useState } from 'react'
import {
  getSubjectPropertyDefault,
  getSubjectPropertyDefaults,
  setSubjectPropertyDefault
} from 'api'
import Select from 'components/common/Select'
import { validateForm } from 'utils/validation'
import { useAuth } from 'components/auth/AuthProvider'

interface Option {
  label: string
  value: number | string
}

const defaultSubjectPropertyState = {
  property: null
}

const SubjectPropertyDefaults: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [selectedDefault, setSelectedDefault] = useState({
    ...defaultSubjectPropertyState
  })
  const [subjectPropertyDefaults, setSubjectPropertyDefaults] = useState<
    Option[]
  >([])
  const [error, setError] = useState({ ...defaultSubjectPropertyState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchUserDefault = async () => {
      try {
        const { userid_ssid } = user

        const subjectProperty = await getSubjectPropertyDefault(userid_ssid)
        setSelectedDefault({ property: subjectProperty })
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    fetchUserDefault()
  }, [])

  useEffect(() => {
    const fetchSubjectPropertyDefaults = async () => {
      try {
        const { userid_ssid } = user
        const options = await getSubjectPropertyDefaults(userid_ssid)
        setSubjectPropertyDefaults(options)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    fetchSubjectPropertyDefaults()
  }, [])

  const submitDefaults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultSubjectPropertyState }
    const errorObj = validateForm(selectedDefault)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const { userid_ssid } = user
        const message = await setSubjectPropertyDefault({
          userid_ssid,
          department_id: selectedDefault.property.value
        })
        setSuccessMessage(message)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
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
            <p>
              Includes/Excludes Subject Property in Comparables Lists &
              Calculations
            </p>
            <Select
              options={subjectPropertyDefaults}
              value={selectedDefault.property}
              onChange={item => handleSelect(item, 'property')}
              label="Inc/Exc Subject Property"
              placeholder="Select..."
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
