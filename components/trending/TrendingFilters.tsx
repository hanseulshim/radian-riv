import React, { useState, useEffect } from 'react'
import { getPropertyTypes, getMsas, getZipcodes, Option } from 'api'
import { useTrending } from 'context/TrendingProvider'
import CustomSelect from 'components/common/CustomSelect'

export default function TrendingFilters() {
  const {
    stateList,
    countyList,
    selectedState,
    setSelectedState,
    selectedCounty,
    setSelectedCounty,
    selectedZip,
    setSelectedZip,
    selectedType,
    setSelectedType,
    selectedMsa,
    setSelectedMsa
  } = useTrending()
  const [zipcodes, setZipcodes] = useState<Option[]>([])
  const [types, setTypes] = useState<Option[]>([])
  const [msas, setMsas] = useState<Option[]>([])

  useEffect(() => {
    if (selectedState) {
      const zipcodeFetch = async () => {
        const zipcodes = await getZipcodes(selectedState.value)
        setZipcodes(zipcodes)
      }
      zipcodeFetch()
      const fetchMSA = async () => {
        const msas = await getMsas(selectedState.value)
        setMsas(msas)
      }
      fetchMSA()
      const typesFetch = async () => {
        const types = await getPropertyTypes(selectedState.value)
        setTypes(types)
      }
      typesFetch()
    }
  }, [selectedState])

  const onSelectChange = (opt: Option, key: string) => {
    if (key === 'selectedState') {
      setSelectedState(opt)
      setSelectedCounty(null)
      setSelectedZip(null)
    } else if (key === 'selectedCounty') {
      setSelectedCounty(opt)
    } else if (key === 'selectedZip') {
      setSelectedZip(opt)
    } else if (key === 'selectedType') {
      setSelectedType(opt)
    } else if (key === 'selectedMsa') {
      setSelectedMsa(opt)
    }
  }

  return (
    <div className="home-price-form-container">
      <div className="selects-container">
        <div className="form-row">
          <CustomSelect
            options={stateList}
            value={selectedState}
            onChange={opt => onSelectChange(opt as Option, 'selectedState')}
            label="State"
            placeholder="State..."
          />
          <CustomSelect
            options={countyList}
            value={selectedCounty}
            onChange={opt => onSelectChange(opt as Option, 'selectedCounty')}
            label="County"
            placeholder="County..."
          />
          <CustomSelect
            options={zipcodes}
            value={selectedZip}
            onChange={opt => onSelectChange(opt as Option, 'selectedZip')}
            label="Zipcode"
            isSearchable
            placeholder="Zip..."
          />
          <CustomSelect
            options={types}
            value={selectedType}
            onChange={opt => onSelectChange(opt, 'selectedType')}
            label="Type"
            placeholder="Type..."
          />
        </div>
        <div className="form-row">
          <CustomSelect
            options={msas}
            value={selectedMsa}
            onChange={opt => onSelectChange(opt, 'selectedMsa')}
            label="MSA"
            placeholder="MSA..."
          />
        </div>
      </div>
    </div>
  )
}
