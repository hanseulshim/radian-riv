import React, { useState, createContext, useContext } from 'react'
import { IOrders } from 'api'

export const defaultOrder = {
  ordersId: null,
  loanNum: null,
  poolId: null,
  poolName: null,
  confidenceRatio: null,
  radius: null,
  monthsBack: null,
  monthsBackId: null,
  asOfDate: null,
  locked: null,
  imageUrl: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  bed: null,
  estBed: null,
  bath: null,
  estBath: null,
  sqftPrice: null,
  sqft: null,
  estSqft: null,
  lotSize: null,
  garage: null,
  estGarage: null,
  yrBuilt: null,
  estYrBuilt: null,
  propertyTypeId: null,
  propertyType: null,
  calculatedPrice: null,
  asIsSalePrice: null,
  quickSalePrice: null,
  lat: null,
  lng: null,
  geoAccuracy: null,
  reo: null,
  orderDate: null,
  completeDate: null,
  initialCompleteDate: null,
  dnaSource: null,
  dnaSourceValue: null,
  subdivision: null,
  orderByIdUser: null,
  orderByUser: null,
  status: null,
  reconcileStatusId: null,
  reconcileStatus: null,
  productType: null,
  client: null,
  units: null
}

type OrderContextType = {
  order: IOrders
  setOrder: React.Dispatch<React.SetStateAction<IOrders>>
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
  const [order, setOrder] = useState<IOrders>(defaultOrder)

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
