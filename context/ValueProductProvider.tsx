import React, { useState, createContext, useContext } from 'react'
interface Order {
  id: string
  address: string
}
type ValueProductContextType = {
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
}

const ValueProductContext = createContext<ValueProductContextType>({
  order: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOrder: () => {}
})

export const ValueProductProvider = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [order, setOrder] = useState<Order>(null)

  return (
    <ValueProductContext.Provider
      value={{
        order,
        setOrder
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
