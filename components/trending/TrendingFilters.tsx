import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getPropertyTypes, getMSA, getZipcodes, Option } from 'api'
import { useTrending } from 'context/trending/TrendingProvider'
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
  const router = useRouter()
  const { state: routerState, county: routerCounty } = router.query

  // These calls are for fetching static lists on mount. They don't need to be refetched on input change
  useEffect(() => {
    const typesFetch = async () => {
      const types = await getPropertyTypes()
      setTypes(types)
    }
    typesFetch()
  }, [])

  // useEffect(() => {
  //   if (county && counties.length) {
  //     const setCountyDefault = async () => {
  //       const currentCounty = await getCurrentCounty(
  //         state as string,
  //         county as string
  //       )
  //       const matchedCounty = counties.find(
  //         countyObj => countyObj.value === currentCounty.currentCounty.value
  //       )
  //       onSelectChange(matchedCounty, 'county')
  //     }
  //     setCountyDefault()
  //   }
  // }, [counties])

  useEffect(() => {
    if (selectedState) {
      const zipcodeFetch = async () => {
        const zipcodes = await getZipcodes(selectedState)
        setZipcodes(zipcodes)
      }
      zipcodeFetch()
      const fetchMSA = async () => {
        const msas = await getMSA()
        setMsas(msas)
      }
      fetchMSA()
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
