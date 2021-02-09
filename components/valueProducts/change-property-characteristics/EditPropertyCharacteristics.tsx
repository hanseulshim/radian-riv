import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import { useState } from 'react'

interface Error {
  asOfDate: string
  yearBuilt: string
}
interface Props {
  setSelectedSource: (source: string) => void
  selectedSource: string
  setCharacteristics: (key: string, value: string | number) => void
  characteristics: {
    bed: string
    bath: string
    sqft: string
    units: string
    garage: string
    lotSize: string
    yearBuilt: string
  }
  error: Error
}

export default function EditPropertyCharacteristics({
  selectedSource,
  setSelectedSource,
  characteristics,
  setCharacteristics,
  error
}: Props) {
  const [sourceOptions] = useState([
    {
      label: 'User',
      value: 'User'
    },
    {
      label: 'Appraisal',
      value: 'Appraisal'
    }
  ])

  return (
    <div className="edit-prop-chars-container">
      <CustomSelect
        options={sourceOptions}
        value={sourceOptions.find(opt => opt.value === selectedSource) || null}
        onChange={opt => setSelectedSource(opt.value)}
        label={'Select Source'}
      />
      {Object.keys(characteristics).map(char => {
        return (
          <Input
            type={'number'}
            value={characteristics[char]}
            label={char}
            capitalizeLabel
            onChange={e => setCharacteristics(char, e.target.value)}
            error={char === 'yearBuilt' ? error.yearBuilt : ''}
            key={'input' + char}
            disabled={
              selectedSource !== 'User' && selectedSource !== 'Appraisal'
            }
          />
        )
      })}
    </div>
  )
}
