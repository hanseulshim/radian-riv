import React, { useEffect, useState } from 'react'
import { getFilterDefaults, getFilterDefaultOptions } from 'api'
import { withAuth } from 'components/auth/AuthRoute'
import Select from 'components/common/Select'
import Input from 'components/common/Input'
import { setFilterDefaults } from 'api'
import { validateForm } from 'utils/validation'
import { useAuth } from 'components/auth/AuthProvider'

const defaultFilterState = {
  sqFt: null,
  min: null,
  max: null,
  percent: null,
  retail: null,
  distressed: null,
  timeGoingBack: null,
  onlySubdivisionComps: null,
  restrictComps: null
}

interface Option {
  label: string
  value: number | string
}

const FilterDefaults: React.FC = () => {
  const {
    auth: { user }
  } = useAuth()
  const [filterDefaults, setFilterDefaultState] = useState({
    ...defaultFilterState
  })
  const [squareFootages, setSquareFootages] = useState<Option[]>([])
  const [timeIntervals, setTimeIntervals] = useState<Option[]>([])
  const [compTypes, setCompTypes] = useState<Option[]>([])
  const [error, setError] = useState({ ...defaultFilterState })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchDefaults = async () => {
      try {
        const defaults = await getFilterDefaults()
        setFilterDefaultState({
          sqFt: defaults.sqFt || null,
          min: defaults.min || null,
          max: defaults.max || null,
          percent: defaults.percent || null,
          retail: defaults.retail,
          distressed: defaults.distressed,
          timeGoingBack: defaults.timeGoingBack,
          onlySubdivisionComps: defaults.onlySubdivisionComps,
          restrictComps: defaults.restrictComps
        })
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
    fetchDefaults()
  }, [])

  useEffect(() => {
    const fetchFilterDefaultOptions = async () => {
      try {
        const options = await getFilterDefaultOptions()
        setSquareFootages(options.squareFootages)
        setTimeIntervals(options.timeIntervals)
        setCompTypes(options.compTypes)
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
    setFilterDefaultState(stateCopy)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setFilterDefaultState({ ...filterDefaults, [key]: e.target.value })
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
    <div className="container filter-defaults">
      <h1>AVE Filter Defaults</h1>
      <div className="form">
        <form onSubmit={submitDefaults}>
          <div className="filter-defaults-container">
            <div className="filter-defaults-column">
              <Select
                options={squareFootages}
                value={filterDefaults.sqFt}
                onChange={item => handleSelect(item, 'sqFt')}
                label="Sq Ft"
                placeholder="Select Square Footage"
              />
              <Input
                value={filterDefaults.min}
                error={error.min}
                onChange={e => handleInput(e, 'min')}
                label="Min"
                type="number"
              />
              <Input
                value={filterDefaults.max}
                error={error.max}
                onChange={e => handleInput(e, 'max')}
                label="Max"
                type="number"
              />
              <Input
                value={filterDefaults.percent}
                error={error.percent}
                onChange={e => handleInput(e, 'percent')}
                label="%"
                type="number"
              />
            </div>
            <div className="filter-defaults-column">
              <div className="title">Comparable</div>
              <div className="checkbox">
                <label htmlFor="retail">Retail</label>
                <input
                  type="checkbox"
                  checked={filterDefaults.retail}
                  onChange={e => handleCheck(e, 'retail')}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="distressed">Distressed</label>
                <input
                  type="checkbox"
                  checked={filterDefaults.distressed}
                  onChange={e => handleCheck(e, 'distressed')}
                />
              </div>
              <div className="checkbox">
                <label>
                  Only include comps in subject&apos;s same subdivision
                </label>
                <input
                  type="checkbox"
                  checked={filterDefaults.onlySubdivisionComps}
                  onChange={e => handleCheck(e, 'onlySubdivisionComps')}
                />
              </div>
            </div>
            <div className="filter-defaults-column">
              <Select
                options={timeIntervals}
                value={filterDefaults.timeGoingBack}
                onChange={item => handleSelect(item, 'timeGoingBack')}
                label="Time Going Back"
                placeholder="Time Going Back..."
              />
              <Select
                options={compTypes}
                value={filterDefaults.restrictComps}
                onChange={item => handleSelect(item, 'restrictComps')}
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

export default withAuth(FilterDefaults)
