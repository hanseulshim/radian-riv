import { useEffect, useState } from 'react'
import { Option, getPropertyTypeOptions, getMonthsBackOptions } from 'api'
import { useValueProduct } from 'context/ValueProductProvider'
import Input from 'components/common/Input'
import CustomSelect from 'components/common/CustomSelect'

interface Inputs {
  propertyType: string
  monthsBack: string
  asOfDate: string
}

interface Error {
  asOfDate: string
  yearBuilt: string
}

interface Props {
  inputs: Inputs
  setInputs: (Inputs) => void
  error: Error
  setError: (Error) => void
}

export default function EditPropertyOptions({
  inputs,
  setInputs,
  error,
  setError
}: Props) {
  const { propertyInfo } = useValueProduct()
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<Option[]>([])
  const [monthsBackOptions, setMonthsBackOptions] = useState<Option[]>([])

  useEffect(() => {
    const getOptions = async () => {
      const propertyTypes = await getPropertyTypeOptions()
      setPropertyTypeOptions(propertyTypes)
      const monthsBack = await getMonthsBackOptions()
      setMonthsBackOptions(monthsBack)
    }
    getOptions()
  }, [])

  useEffect(() => {
    if (propertyTypeOptions.length && propertyInfo.id) {
      const propertyType = propertyTypeOptions.find(
        opt => opt.value === propertyInfo.propertyType
      )
      setInputs({
        ...inputs,
        propertyType: propertyType.value,
        asOfDate: propertyInfo.asOfDate
      })
    }
  }, [propertyTypeOptions, propertyInfo])

  useEffect(() => {
    if (monthsBackOptions.length && propertyInfo.id) {
      const monthsBack = monthsBackOptions.find(
        opt => opt.value === propertyInfo.compsGoingBack
      )
      setInputs({
        ...inputs,
        monthsBack: monthsBack.value
      })
    }
  }, [monthsBackOptions, propertyInfo])

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
          opt => opt.value === inputs.propertyType
        )}
        onChange={opt => handleSelect(opt, 'propertyType')}
        placeholder={'Select Property Type...'}
      />
      <CustomSelect
        label="Months Back"
        options={monthsBackOptions}
        value={monthsBackOptions.find(opt => opt.value === inputs.monthsBack)}
        onChange={opt => handleSelect(opt, 'monthsBack')}
        placeholder={'Select months back'}
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
