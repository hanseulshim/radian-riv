import React, { useState, createContext, useContext } from 'react'
import { OrderInterface } from 'api'

export const defaultOrder = {
  id: null,
  loanNum: null,
  poolName: null,
  retailMarket: null,
  distressedMarket: null,
  marketArea: null,
  compsBack: null,
  asOfDate: null,
  lock: null,
  photo: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  dnaSource: null,
  bed: null,
  bedEstimate: null,
  bath: null,
  bathEstimate: null,
  sqft: null,
  sqftPrice: null,
  sqftEstimate: null,
  lotSize: null,
  lotSizeEstimate: null,
  garage: null,
  garageEstimate: null,
  year: null,
  yearEstimate: null,
  propertyType: null,
  propertyTypeEstimate: null,
  calculatedPrice: null,
  asIsSalePrice: null,
  quickSalePrice: null,
  lat: null,
  lng: null,
  geoAccuracy: null,
  reo: null,
  rivDate: null,
  subdivision: null
}

type OrderContextType = {
  order: OrderInterface
  setOrder: React.Dispatch<React.SetStateAction<OrderInterface>>
}

const OrderContext = createContext<OrderContextType>({
  order: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOrder: () => {}
})

export const OrderProvider = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [order, setOrder] = useState<OrderInterface>(defaultOrder)

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('Order Context must be used within the Order Provider')
  }
  return context
}
