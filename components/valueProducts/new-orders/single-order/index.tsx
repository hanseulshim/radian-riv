import React, { useState, useEffect } from 'react'
import {
  getFilterDefaults,
  getFilterDefaultsRestrict,
  getFilterDefaultsTime,
  SingleOrderForm,
  Option
} from 'api'
import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import { useTrending } from 'context/TrendingProvider'
import SingleOrderAdvancedFilters from './SingleOrderAdvancedFilters'

interface Alert {
  type: string
  message: string
}

interface Props {
  form: SingleOrderForm
  setForm: (e: any) => void
  onSubmit: () => void
  handleSelectChange: (opt: Option, key: string) => void
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  showFilters: boolean
  error: SingleOrderForm
  setAlert: (alert: Alert) => void
}

export default function SingleOrder({
  form,
  setForm,
  onSubmit,
  handleSelectChange,
  handleInputChange,
  showFilters,
  error,
  setAlert
}: Props) {
  const { stateList } = useTrending()
  const [restrictCompOptions, setRestrictCompOptions] = useState<Option[]>([])
  const [compsGoingBackOptions, setCompsGoingBackOptions] = useState<Option[]>(
    []
  )

  useEffect(() => {
    const geAllOptions = async () => {
      try {
        const formCopy = { ...form }
        const resultArray = await Promise.all([
          await getFilterDefaultsRestrict(),
          await getFilterDefaultsTime()
        ])
        const filterDefaults = await getFilterDefaults()

        resultArray.forEach((response, index) => {
          if (index === 0) {
            setRestrictCompOptions(response)
            formCopy.restrictComps = filterDefaults.restrict_comps
          } else if (index === 1) {
            setCompsGoingBackOptions(response)
            formCopy.compsBack = filterDefaults.time_going_back
          }
        })
        setForm(formCopy)
        setAlert(null)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    geAllOptions()
  }, [])

  return (
    <div className="single-order">
      <div className="basic-filters">
        <Input
          value={form.loanNumber}
          label="Loan Number"
          onChange={e => handleInputChange(e, 'loanNumber')}
          error={error.loanNumber}
        />
        <Input
          value={form.zip}
          label="Zip"
          onChange={e => handleInputChange(e, 'zip')}
          error={error.zip}
        />
        <div className="street-address">
          <Input
            value={form.address}
            label="Street Address"
            onChange={e => handleInputChange(e, 'address')}
            error={error.address}
          />
        </div>
        <Input
          value={form.city}
          label="City"
          onChange={e => handleInputChange(e, 'city')}
          error={error.city}
        />
        <CustomSelect
          value={form.state}
          label="State"
          placeholder="State"
          onChange={opt => handleSelectChange(opt, 'state')}
          options={stateList}
          classNamePrefix="transparent"
        />
        <CustomSelect
          options={restrictCompOptions}
          value={form.restrictComps}
          label={'Restrict Comps'}
          onChange={opt => handleSelectChange(opt, 'restrictComps')}
        />
        <CustomSelect
          options={compsGoingBackOptions}
          value={form.compsBack}
          label={'Comps Going Back'}
          onChange={opt => handleSelectChange(opt, 'compsGoingBack')}
        />
      </div>
      {showFilters && (
        <SingleOrderAdvancedFilters
          form={form}
          setForm={setForm}
          handleInputChange={handleInputChange}
          error={error}
        />
      )}
      <button
        className="btn"
        type="submit"
        onClick={onSubmit}
        disabled={
          !form.loanNumber ||
          !form.address ||
          !form.zip ||
          !form.city ||
          !form.state
        }
      >
        Submit
      </button>
    </div>
  )
}
