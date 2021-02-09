import React, { useState, createContext, useContext } from 'react'
import { PropertyInterface } from 'api'

const defaultPropertyInfo = {
  actDom: null,
  address: null,
  agSqft: null,
  area: null,
  areaParameter: null,
  asOfDate: null,
  basement: null,
  bath: null,
  bed: null,
  calculatedPrice: null,
  city: null,
  coeDate: null,
  coePrice: null,
  coe2Date: null,
  coe2Price: null,
  compsGoingBack: null,
  concessions: null,
  daysFromFlip: null,
  description: null,
  distressed: null,
  distressedMarket: null,
  dnaSource: null,
  garage: null,
  geoAccuracy: null,
  id: null,
  lat: null,
  listDate: null,
  listingNumber: null,
  listingSheetSelected: null,
  listPrice: null,
  listPricePerSqft: null,
  lng: null,
  lock: null,
  loanNumber: null,
  lotSize: null,
  yearBuilt: null,
  reo: null,
  units: null,
  propertyType: null,
  marketArea: null,
  order: null,
  pool: null,
  photos: null,
  poolName: null,
  retailMarket: null,
  rivDate: null,
  schoolDistrict: null,
  soldPrice: null,
  sqft: null,
  sqftPrice: null,
  subdivision: null,
  summaryComments: null,
  source: null,
  state: null,
  targetDistance: null,
  totalSqft: null,
  totDom: null,
  valuationPercent: null,
  waterfront: null,
  zip: null
}

type ValueProductContextType = {
  propertyInfo: PropertyInterface
  setPropertyInfo: React.Dispatch<React.SetStateAction<PropertyInterface>>
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
  const [propertyInfo, setPropertyInfo] = useState<PropertyInterface>(
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
