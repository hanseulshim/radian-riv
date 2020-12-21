import React, { useEffect, useState } from 'react'
import {
  getSubjectPropertyDefault,
  getSubjectPropertyDefaults,
  setSubjectPropertyDefault
} from 'api'
import Select from 'components/common/Select'
import { useAuth } from 'components/auth/AuthProvider'
import Form from 'components/common/Form'

interface Option {
  label: string
  value: number | string
}

const defaultSubjectPropertyState = {
  property: null
}

function SubjectPropertyDefaults() {
  const {
    auth: { user }
  } = useAuth()
  const [selectedDefault, setSelectedDefault] = useState({
    ...defaultSubjectPropertyState
  })
  const [subjectPropertyDefaults, setSubjectPropertyDefaults] = useState<
    Option[]
  >([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const fetchUserDefault = async () => {
      try {
        const { userid_ssid } = user

        const subjectProperty = await getSubjectPropertyDefault(userid_ssid)
        setSelectedDefault({ property: subjectProperty })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
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
        setAlert({ type: 'error', message: e.message })
      }
    }
    fetchSubjectPropertyDefaults()
  }, [])

  const submitDefaults = async () => {
    setAlert(null)
    try {
      const { userid_ssid } = user
      const message = await setSubjectPropertyDefault({
        userid_ssid,
        subject_property_id: selectedDefault.property.value
      })
      setAlert({ type: 'success', message })
    } catch (e) {
      setAlert({ type: 'error', message: e.message })
    }
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
        <Form
          id="subject-property-defaults"
          onSubmit={submitDefaults}
          alert={alert}
        >
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
          <button className="btn btn-secondary btn-small">Submit</button>
        </Form>
      </div>
    </div>
  )
}

export default SubjectPropertyDefaults
