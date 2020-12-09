import React, { useEffect, useState } from 'react'
import {
  getFilterDefaults,
  getFilterDefaultsSquareFt,
  getFilterDefaultsSquareFtPercent,
  getFilterDefaultsTime,
  getFilterDefaultsRestrict
} from 'api'
import Select from 'components/common/Select'
import Input from 'components/common/Input'
import { setFilterDefaults } from 'api'
import { validateForm } from 'utils/validation'
import { useAuth } from 'components/auth/AuthProvider'
import { Checkbox } from 'components/common/Checkbox'

const defaultFilterState = {
  sqft: null,
  sqft_min: null,
  sqft_max: null,
  sqft_percent: null,
  comparable_retail: null,
  comparable_distressed: null,
  time_going_back: null,
  comps_subdivision: null,
  restrict_comps: null
}

interface Option {
  label: string
  value: number | string
}

const AveFilterDefaults: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [filterDefaults, setFilterDefaultState] = useState({
    ...defaultFilterState
  })
  const [squareFootageOptions, setSquareFootageOptions] = useState<Option[]>([])
  const [percentOptions, setPercentOptions] = useState<Option[]>([])
  const [timeOptions, setTimeOptions] = useState<Option[]>([])
  const [restrictCompOptions, setRestrictCompOptions] = useState<Option[]>([])
  const [error, setError] = useState({ ...defaultFilterState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchUserDefaults = async () => {
      try {
        const defaults = await getFilterDefaults(user.userid_ssid)
        setFilterDefaultState({
          sqft: defaults.sqft || null,
          sqft_min: defaults.sqft_min || null,
          sqft_max: defaults.sqft_max || null,
          sqft_percent: defaults.sqft_percent || null,
          comparable_retail: defaults.comparable_retail,
          comparable_distressed: defaults.comparable_distressed,
          time_going_back: defaults.time_going_back,
          comps_subdivision: defaults.comps_subdivision,
          restrict_comps: defaults.restrict_comps
        })
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    fetchUserDefaults()
  }, [])

  useEffect(() => {
    const fetchFilterDefaultOptions = async () => {
      try {
        const sqFtOptions = await getFilterDefaultsSquareFt()
        setSquareFootageOptions(sqFtOptions)
        const sqFtPercentOptions = await getFilterDefaultsSquareFtPercent()
        setPercentOptions(sqFtPercentOptions)
        const timeOptions = await getFilterDefaultsTime()
        setTimeOptions(timeOptions)
        const restrictOptions = await getFilterDefaultsRestrict()
        setRestrictCompOptions(restrictOptions)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    fetchFilterDefaultOptions()
  }, [])

  const submitDefaults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    const errorCopy = { ...defaultFilterState }
    const errorObj = validateForm(filterDefaults)
    const errorArr = Object.keys(errorObj)

    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const message = await setFilterDefaults(filterDefaults)
        setSuccessMessage(message)
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    setError(errorCopy)
  }

  const handleSelect = (item: Option, selectedKey: string) => {
    const stateCopy = { ...filterDefaults }
    stateCopy[selectedKey] = item
    // TODO why doesnt this clear the inputs?
    if (selectedKey === 'sqFt' && item.value !== filterDefaults.sqft) {
      if (item.value === 1) {
        stateCopy.sqft_percent = null
      } else {
        stateCopy.sqft_min = null
        stateCopy.sqft_max = null
      }
    }
    setFilterDefaultState(stateCopy)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    console.log('Im hit!')
    setFilterDefaultState({
      ...filterDefaults,
      [key]: parseInt(e.target.value)
    })
  }

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setFilterDefaultState({ ...filterDefaults, [key]: e.target.checked })
  }

  return (
    <div>
      <h1>AVE Filter Defaults</h1>
      <div className="form">
        <form onSubmit={submitDefaults}>
          <div className="filter-defaults-container">
            <div className="filter-defaults-column">
              <div className="title">Square Footage</div>
              <Select
                options={squareFootageOptions}
                value={filterDefaults.sqft}
                onChange={item => handleSelect(item, 'sqFt')}
                label="Sq Ft"
                placeholder="Select Square Footage"
              />
              <Input
                value={filterDefaults.sqft_min}
                error={error.sqft_min}
                onChange={e => handleInput(e, 'sqft_min')}
                label="Min"
                type="number"
                disabled={
                  filterDefaults.sqft && filterDefaults.sqft.value !== 1
                }
              />
              <Input
                value={filterDefaults.sqft_max}
                error={error.sqft_max}
                onChange={e => handleInput(e, 'sqft_max')}
                label="Max"
                type="number"
                disabled={
                  filterDefaults.sqft && filterDefaults.sqft.value !== 1
                }
              />
              <Select
                options={percentOptions}
                value={filterDefaults.sqft_percent}
                onChange={e => handleSelect(e, 'sqft_percent')}
                label="%"
                placeholder="Select variance"
                disabled={
                  filterDefaults.sqft && filterDefaults.sqft.value !== 2
                }
              />
            </div>
            <div className="filter-defaults-column">
              <div className="title">Comparables</div>
              <Checkbox
                label={'Retail'}
                checked={filterDefaults.comparable_retail}
                onChange={e => handleCheck(e, 'comparable_retail')}
              />
              <Checkbox
                label={'Distressed'}
                checked={filterDefaults.comparable_distressed}
                onChange={e => handleCheck(e, 'comparable_distressed')}
              />
              <Checkbox
                label="Only include comps in subject's same subdivision"
                checked={filterDefaults.comps_subdivision}
                onChange={e => handleCheck(e, 'comps_subdivision')}
              />
            </div>
            <div className="filter-defaults-column">
              <div className="title">Time Going Back</div>
              <Select
                options={timeOptions}
                value={filterDefaults.time_going_back}
                onChange={item => handleSelect(item, 'time_going_back')}
                label="Time Going Back"
                placeholder="Time Going Back..."
              />
            </div>
            <div className="filter-defaults-column">
              <div className="title">Restrict Comps</div>
              <Select
                options={restrictCompOptions}
                value={filterDefaults.restrict_comps}
                onChange={item => handleSelect(item, 'restrict_comps')}
                label="Restrict Comps"
                placeholder="Restrict Comps"
              />
            </div>
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

export default AveFilterDefaults
