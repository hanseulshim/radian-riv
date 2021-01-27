import React, { useState, createContext, useContext } from 'react'
export interface PropertyInfoType {
  id: string
  poolName: string
  loanNumber: string
  address: string
  city: string
  state: string
  zip: string
  subdivision: string
  bed: number
  bath: number
  sqft: number
  garage: number
  lotSize: number
  yearBuilt: number
  dnaSource: string
  reo: boolean
  propertyType: string
  marketArea: string
  compsGoingBack: string
  asOfDate: string
  rivDate: string
  calculatedPrice: number
  priceSqFt: number
  lock: boolean
  geoAccuracy: string
  retailMarket: number
  distressedMarket: number
  summaryComments: string
  area: string
  areaParameter: string
}

const defaultPropertyInfo = {
  id: null,
  poolName: null,
  loanNumber: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  subdivision: null,
  bed: null,
  bath: null,
  sqft: null,
  garage: null,
  lotSize: null,
  yearBuilt: null,
  dnaSource: null,
  reo: null,
  propertyType: null,
  marketArea: null,
  compsGoingBack: null,
  asOfDate: null,
  rivDate: null,
  calculatedPrice: null,
  priceSqFt: null,
  lock: null,
  geoAccuracy: null,
  retailMarket: null,
  distressedMarket: null,
  summaryComments: null,
  area: null,
  areaParameter: null
}

type ValueProductContextType = {
  propertyInfo: PropertyInfoType
  setPropertyInfo: React.Dispatch<React.SetStateAction<PropertyInfoType>>
}

const ValueProductContext = createContext<ValueProductContextType>({
  propertyInfo: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPropertyInfo: () => {}
})

export const ValueProductProvider = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfoType>(
    defaultPropertyInfo
  )

  return (
    <ValueProductContext.Provider
      value={{
        propertyInfo,
        setPropertyInfo
      }}
    >
      {children}
    </ValueProductContext.Provider>
  )
}

export const useValueProduct = (): ValueProductContextType => {
  const context = useContext(ValueProductContext)
  if (context === undefined) {
    throw new Error(
      'Value Product Context must be used within the Value Product Provider'
    )
  }
  return context
}
