import React from 'react'
import { PropertyInterface } from 'api'

interface Props {
  properties: PropertyInterface[]
}

export default function ContractProperties({ properties }: Props) {
  return (
    <div>
      {properties.map(property => {
        return <div key={property.order}>{property.address}</div>
      })}
    </div>
  )
}
