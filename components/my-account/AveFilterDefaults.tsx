import { useEffect, useState } from 'react'
import {
  getFilterDefaults,
  getFilterDefaultsSquareFt,
  getFilterDefaultsSquareFtPercent,
  getFilterDefaultsTime,
  getFilterDefaultsRestrict
} from 'api'
import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import { setFilterDefaults } from 'api'
import Checkbox from 'components/common/Checkbox'
import Form from 'components/common/Form'

const defaultFilterState = {
  sqft: null,
  sqft_min: '',
  sqft_max: '',
  sqft_percent: null,
  comparable_retail: false,
  comparable_distressed: false,
  time_going_back: null,
  comps_subdivision: false,
  restrict_comps: null
}

interface Option {
  label: string
  value: number | string
}

function AveFilterDefaults() {
  const [filterDefaults, setFilterDefaultState] = useState({
    ...defaultFilterState
  })
  const [squareFootageOptions, setSquareFootageOptions] = useState<Option[]>([])
  const [percentOptions, setPercentOptions] = useState<Option[]>([])
  const [timeOptions, setTimeOptions] = useState<Option[]>([])
  const [restrictCompOptions, setRestrictCompOptions] = useState<Option[]>([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const fetchUserDefaults = async () => {
      try {
        const defaults = await getFilterDefaults()
        setFilterDefaultState({
          sqft: defaults.sqft || null,
          sqft_min: defaults.sqft_min.toString() || '',
          sqft_max: defaults.sqft_max.toString() || '',
          sqft_percent: defaults.sqft_percent || null,
          comparable_retail: defaults.comparable_retail,
          comparable_distressed: defaults.comparable_distressed,
          time_going_back: defaults.time_going_back,
          comps_subdivision: defaults.comps_subdivision,
          restrict_comps: defaults.restrict_comps
        })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    fetchUserDefaults()
  }, [])

  useEffect(() => {
    const fetchFilterDefaultOptions = async () => {
      try {
        const sqftOptions = await getFilterDefaultsSquareFt()
        const sqftPercentOptions = await getFilterDefaultsSquareFtPercent()
        const restrictOptions = await getFilterDefaultsRestrict()
        const timeOptions = await getFilterDefaultsTime()
        setSquareFootageOptions(sqftOptions)
        setPercentOptions(sqftPercentOptions)
        setRestrictCompOptions(restrictOptions)
        setTimeOptions(timeOptions)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    fetchFilterDefaultOptions()
  }, [])

  const submitDefaults = async () => {
    setAlert(null)
    try {
      const {
        sqft,
        sqft_percent,
        time_going_back,
        restrict_comps,
        sqft_min,
        sqft_max
      } = filterDefaults
      const message = await setFilterDefaults({
        ...filterDefaults,
        sqft: sqft ? sqft.value : null,
        sqft_min: parseInt(sqft_min) || null,
        sqft_max: parseInt(sqft_max) || null,
        sqft_percent: sqft_percent ? sqft_percent.value : null,
        time_going_back: time_going_back ? time_going_back.value : null,
        restrict_comps: restrict_comps ? restrict_comps.value : null
      })
      setAlert({ type: 'success', message: message })
    } catch (e) {
      setAlert({ type: 'error', message: e.message })
    }
  }

  const handleSelect = (item: Option, selectedKey: string) => {
    const stateCopy = { ...filterDefaults }
    stateCopy[selectedKey] = item
    if (selectedKey === 'sqft') {
      if (item.label && !item.label.toLowerCase().includes('min')) {
        stateCopy.sqft_min = ''
        stateCopy.sqft_max = ''
      } else if (item.label.toLowerCase().includes('min')) {
        stateCopy.sqft_percent = null
      } else {
        stateCopy.sqft_percent = null
        stateCopy.sqft_min = ''
        stateCopy.sqft_max = ''
      }
    }
    setFilterDefaultState(stateCopy)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    setFilterDefaultState({
      ...filterDefaults,
      [key]: e.target.value
    })
  }

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    setFilterDefaultState({ ...filterDefaults, [key]: e.target.checked })
  }

  return (
    <div>
      <h1>AVE Filter Defaults</h1>
      <div className="form">
        <Form id="ave-filter-defaults" onSubmit={submitDefaults} alert={alert}>
          <div className="filter-defaults-container">
            <div className="filter-defaults-column">
              <div className="title">Square Footage</div>
              <CustomSelect
                options={squareFootageOptions}
                value={filterDefaults.sqft}
                onChange={item => handleSelect(item, 'sqft')}
                label="Sq Ft"
                placeholder="Select Square Footage"
              />
              <Input
                value={filterDefaults.sqft_min}
                error={''}
                onChange={e => handleInput(e, 'sqft_min')}
                label="Min"
                type="number"
                disabled={
                  filterDefaults.sqft && filterDefaults.sqft.value !== 1
                }
              />
              <Input
                value={filterDefaults.sqft_max}
                error={''}
                onChange={e => handleInput(e, 'sqft_max')}
                label="Max"
                type="number"
                disabled={
                  filterDefaults.sqft && filterDefaults.sqft.value !== 1
                }
              />
              <CustomSelect
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
              <CustomSelect
                options={timeOptions}
                value={filterDefaults.time_going_back}
                onChange={item => handleSelect(item, 'time_going_back')}
                label="Time Going Back"
                placeholder="Time Going Back..."
              />
            </div>
            <div className="filter-defaults-column">
              <div className="title">Restrict Comps</div>
              <CustomSelect
                options={restrictCompOptions}
                value={filterDefaults.restrict_comps}
                onChange={item => handleSelect(item, 'restrict_comps')}
                label="Restrict Comps"
                placeholder="Restrict Comps"
              />
            </div>
          </div>
          <button className="btn btn-secondary btn-small">Submit</button>
        </Form>
      </div>
    </div>
  )
}

export default AveFilterDefaults
