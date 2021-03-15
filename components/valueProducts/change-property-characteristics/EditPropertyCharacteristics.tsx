import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import { useState } from 'react'
import { OrderPropertyInterface } from 'api'

interface Characteristics {
  bed: string
  bath: string
  sqft: string
  units: string
  garage: string
  lotSize: string
  yrBuilt: string
}

interface Error {
  yrBuilt: string
  asOfDate: string
}
interface Props {
  setSelectedSource: (source: string) => void
  selectedSource: string
  setCharacteristics: (key: string, value: string) => void
  characteristics: Characteristics
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
        classNamePrefix={'select-source'}
      />
      {Object.keys(characteristics).map(char => {
        return (
          <Input
            type={'number'}
            value={characteristics[char]}
            label={char}
            capitalizeLabel
            onChange={e => setCharacteristics(char, e.target.value)}
            error={char === 'yrBuilt' ? error.yrBuilt : ''}
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
