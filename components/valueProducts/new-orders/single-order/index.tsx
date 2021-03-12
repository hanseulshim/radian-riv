import React, { useState, useEffect } from 'react'
import {
  getFilterDefaults,
  ISingleOrderOptions,
  getSingleOrderOptions,
  submitSingleOrder,
  IGreenForm,
  ISingleOrderForm
} from 'api'
import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import { useTrending } from 'context/TrendingProvider'
import SingleOrderAdvancedFilters from './SingleOrderAdvancedFilters'
import Checkbox from 'components/common/Checkbox'
import SetUserDefaultsModal from '../SetUserDefaultsModal'
import { validateForm } from 'utils/validation'
import Alert from 'components/common/Alert'
import Suggestions from './Suggestions'

interface Props {
  greenForm: IGreenForm
}

const defaultState = {
  loanNum: '',
  zip: '',
  address: '',
  city: '',
  state: '',
  propertyTypeId: '',
  monthsBack: '',
  bed: '',
  bath: '',
  sqft: '',
  lotSize: '',
  garage: '',
  yrBuilt: '',
  asOfDate: '',
  contactName: '',
  contactPhone: '',
  clientName: ''
}

export default function SingleOrder({ greenForm }: Props) {
  const { stateList } = useTrending()
  const [
    singleOrderOptions,
    setSingleOrderOptions
  ] = useState<ISingleOrderOptions>({
    restrictComps: [],
    monthsBack: []
  })
  const [state, setSelectedState] = useState(null)
  const [restrictComps, setRestrictComps] = useState(null)
  const [monthsBack, setMonthsBack] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [form, setForm] = useState<ISingleOrderForm>({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [userDefaultsModal, setUserDefaultsModal] = useState(false)

  useEffect(() => {
    const geAllOptions = async () => {
      try {
        const options = await getSingleOrderOptions()
        const filterDefaults = await getFilterDefaults()
        setSingleOrderOptions(options)
        setRestrictComps(filterDefaults.restrict_comps)
        setMonthsBack(filterDefaults.time_going_back)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    geAllOptions()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setForm({ ...form, [key]: e.target.value })
  }

  const toggleUserDefaultModal = () => {
    setUserDefaultsModal(!userDefaultsModal)
  }

  const onSubmit = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const reqFields = {
      loanNum: true,
      address: true,
      zip: true,
      city: true
    }
    const errorObj = validateForm(form, reqFields)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else if (!state) {
      setAlert({ type: 'error', message: 'You must select a state' })
    } else {
      try {
        const response = await submitSingleOrder(form, greenForm)
        if (response) {
          setAlert({ type: 'success', message: response })
        }
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <div className="flex-col">
      <button className="btn btn-small mb-8" onClick={toggleUserDefaultModal}>
        Set User Defaults
      </button>
      <Checkbox
        label="Show Advanced Filters"
        checked={showFilters}
        onChange={e => setShowFilters(e.target.checked)}
      />
      <div className="flex my-4 space-x-4">
        <div className="w-3/5">
          <Input
            value={form.loanNum}
            label="Loan Number"
            onChange={e => handleInputChange(e, 'loanNum')}
            error={error.loanNum}
          />
        </div>
        <div className="w-2/5">
          <Input
            value={form.zip}
            label="Zip"
            onChange={e => handleInputChange(e, 'zip')}
            error={error.zip}
          />
        </div>
        <div className="w-4/5">
          <Input
            value={form.address}
            label="Street Address"
            onChange={e => handleInputChange(e, 'address')}
            error={error.address}
          />
        </div>
        <div className="w-3/5">
          <Input
            value={form.city}
            label="City"
            onChange={e => handleInputChange(e, 'city')}
            error={error.city}
          />
        </div>
        <div className="w-2/5 relative top-4">
          <CustomSelect
            value={state}
            label="State"
            placeholder="State"
            onChange={opt => {
              setForm({ ...form, state: opt.value })
              setSelectedState(opt)
            }}
            options={stateList}
            classNamePrefix="transparent"
          />
        </div>
      </div>
      <div className="flex my-4 space-x-4 w-1/2">
        <CustomSelect
          options={singleOrderOptions.restrictComps}
          value={restrictComps}
          label={'Restrict Comps'}
          onChange={opt => {
            setForm({ ...form, propertyTypeId: opt.value })
            setRestrictComps(opt)
          }}
        />
        <CustomSelect
          options={singleOrderOptions.monthsBack}
          value={monthsBack}
          label={'Comps Going Back'}
          onChange={opt => {
            setForm({ ...form, monthsBack: opt.value })
            setMonthsBack(opt)
          }}
        />
      </div>
      {showFilters && (
        <SingleOrderAdvancedFilters
          form={form}
          handleInputChange={handleInputChange}
          error={error}
        />
      )}
      <button className="btn" type="submit" onClick={onSubmit}>
        Submit
      </button>
      <div className="mt-4">
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
      <Suggestions
        form={form}
        setForm={setForm}
        setSelectedState={setSelectedState}
      />
      {userDefaultsModal && (
        <SetUserDefaultsModal closeModal={toggleUserDefaultModal} />
      )}
    </div>
  )
}
