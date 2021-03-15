import { useEffect, useState } from 'react'
import {
  Option,
  getPropertyTypes,
  getMonthsBack,
  OrderPropertyInterface
} from 'api'
import Input from 'components/common/Input'
import CustomSelect from 'components/common/CustomSelect'

interface Inputs {
  propertyTypeId: number
  monthsBackId: number
  asOfDate: string
}

interface Error {
  yrBuilt: string
  asOfDate: string
}

interface Props {
  inputs: Inputs
  setInputs: (Inputs) => void
  error: Error
  setError: (Error) => void
  orderProps: OrderPropertyInterface
}

export default function EditPropertyOptions({
  inputs,
  setInputs,
  error,
  setError,
  orderProps
}: Props) {
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<Option[]>([])
  const [monthsBackOptions, setMonthsBackOptions] = useState<Option[]>([])

  useEffect(() => {
    const getOptions = async () => {
      const propertyTypes = await getPropertyTypes()
      setPropertyTypeOptions(propertyTypes)
      const monthsBack = await getMonthsBack()
      setMonthsBackOptions(monthsBack)
    }
    getOptions()
  }, [])

  useEffect(() => {
    if (propertyTypeOptions.length && orderProps.ordersId) {
      const propertyType = propertyTypeOptions.find(
        opt => opt.value === orderProps.propertyTypeId
      )
      setInputs({
        ...inputs,
        propertyTypeId: propertyType.value,
        asOfDate: orderProps.asOfDate
      })
    }
  }, [propertyTypeOptions, orderProps])

  useEffect(() => {
    if (monthsBackOptions.length && orderProps.ordersId) {
      const monthsBack = monthsBackOptions.find(
        opt => opt.value === orderProps.monthsBackId
      )
      setInputs({
        ...inputs,
        monthsBackId: monthsBack.value
      })
    }
  }, [monthsBackOptions, orderProps])

  const handleSelect = (opt: Option, key: string) => {
    const stateCopy = { ...inputs }
    stateCopy[key] = opt.value
    setInputs(stateCopy)
  }

  const handleDatePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      asOfDate: ''
    })
    const stateCopy = { ...inputs }
    stateCopy.asOfDate = e.target.value
    setInputs(stateCopy)
  }

  return (
    <div className="input-row-container">
      <CustomSelect
        label="Property Type"
        options={propertyTypeOptions}
        value={propertyTypeOptions.find(
          opt => opt.value === inputs.propertyTypeId
        )}
        onChange={opt => handleSelect(opt, 'propertyTypeId')}
        placeholder={'Select Property Type...'}
        classNamePrefix={'property-type'}
      />
      <CustomSelect
        label="Months Back"
        options={monthsBackOptions}
        value={monthsBackOptions.find(opt => opt.value === inputs.monthsBackId)}
        onChange={opt => handleSelect(opt, 'monthsBackId')}
        placeholder={'Select months back'}
        classNamePrefix={'months-back'}
      />
      <Input
        value={inputs.asOfDate}
        onChange={handleDatePicker}
        label={'As of date'}
        error={error.asOfDate}
      />
    </div>
  )
}
