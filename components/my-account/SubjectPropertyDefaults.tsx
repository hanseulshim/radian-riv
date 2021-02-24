import { useEffect, useState } from 'react'
import {
  getSubjectPropertyDefault,
  getSubjectPropertyDefaults,
  setSubjectPropertyDefault
} from 'api'
import CustomSelect from 'components/common/CustomSelect'
import Form from 'components/common/Form'

interface Option {
  label: string
  value: number | string
}

const defaultSubjectPropertyState = {
  property: null
}

function SubjectPropertyDefaults() {
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
        const subjectProperty = await getSubjectPropertyDefault()
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
        const options = await getSubjectPropertyDefaults()
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
      const message = await setSubjectPropertyDefault(
        selectedDefault.property.value
      )
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
            <CustomSelect
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
