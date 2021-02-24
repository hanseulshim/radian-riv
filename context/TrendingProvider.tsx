import React, { useState, useEffect, createContext, useContext } from 'react'
import { getStates, Option } from 'api'
import { useRouter } from 'next/router'

export const defaultTrending = {
  stateList: [],
  countyList: [],
  state: null,
  county: null,
  selectedState: null,
  selectedCounty: null,
  selectedZip: null,
  selectedMsa: null,
  selectedType: null,
  countyFirstLoad: true
}

type TrendingContextType = {
  stateList: Option[]
  countyList: Option[]
  state: Option
  county: Option
  selectedState: Option
  selectedCounty: Option
  selectedZip: Option
  selectedMsa: Option
  selectedType: Option
  countyFirstLoad: boolean
  setStateList: React.Dispatch<React.SetStateAction<Option[]>>
  setCountyList: React.Dispatch<React.SetStateAction<Option[]>>
  setState: React.Dispatch<React.SetStateAction<Option>>
  setCounty: React.Dispatch<React.SetStateAction<Option>>
  setSelectedState: React.Dispatch<React.SetStateAction<Option>>
  setSelectedCounty: React.Dispatch<React.SetStateAction<Option>>
  setSelectedZip: React.Dispatch<React.SetStateAction<Option>>
  setSelectedMsa: React.Dispatch<React.SetStateAction<Option>>
  setSelectedType: React.Dispatch<React.SetStateAction<Option>>
  setCountyFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
}

const TrendingContext = createContext<TrendingContextType>({
  stateList: [],
  countyList: [],
  state: null,
  county: null,
  selectedState: null,
  selectedCounty: null,
  selectedZip: null,
  selectedMsa: null,
  selectedType: null,
  countyFirstLoad: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStateList: () => {},
  setCountyList: () => {},
  setState: () => {},
  setCounty: () => {},
  setSelectedState: () => {},
  setSelectedCounty: () => {},
  setSelectedZip: () => {},
  setSelectedMsa: () => {},
  setSelectedType: () => {},
  setCountyFirstLoad: () => {}
})

export const TrendingProvider = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [stateList, setStateList] = useState<Option[]>(
    defaultTrending.stateList
  )
  const [countyList, setCountyList] = useState<Option[]>(
    defaultTrending.countyList
  )
  const [state, setState] = useState<Option>(defaultTrending.state)
  const [county, setCounty] = useState<Option>(defaultTrending.county)
  const [selectedState, setSelectedState] = useState<Option>(
    defaultTrending.selectedState
  )
  const [selectedCounty, setSelectedCounty] = useState<Option>(
    defaultTrending.selectedCounty
  )
  const [selectedZip, setSelectedZip] = useState<Option>(
    defaultTrending.selectedZip
  )
  const [selectedMsa, setSelectedMsa] = useState<Option>(
    defaultTrending.selectedMsa
  )
  const [selectedType, setSelectedType] = useState<Option>(
    defaultTrending.selectedType
  )
  const [countyFirstLoad, setCountyFirstLoad] = useState<boolean>(
    defaultTrending.countyFirstLoad
  )

  const { route } = useRouter()

  useEffect(() => {
    const getStateList = async () => {
      if (route !== '/login' && stateList.length === 0) {
        try {
          const states = await getStates()
          setStateList(states)
        } catch (e) {
          console.error(e)
        }
      }
    }
    getStateList()
  }, [route, stateList])

  return (
    <TrendingContext.Provider
      value={{
        stateList,
        countyList,
        state,
        county,
        selectedState,
        selectedCounty,
        selectedZip,
        selectedMsa,
        selectedType,
        countyFirstLoad,
        setStateList,
        setCountyList,
        setState,
        setCounty,
        setSelectedState,
        setSelectedCounty,
        setSelectedZip,
        setSelectedMsa,
        setSelectedType,
        setCountyFirstLoad
      }}
    >
      {children}
    </TrendingContext.Provider>
  )
}

export const useTrending = (): TrendingContextType => {
  const context = useContext(TrendingContext)
  if (context === undefined) {
    throw new Error('TrendingContext must be used within the Trending Provider')
  }
  return context
}
