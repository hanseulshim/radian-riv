import { useState } from 'react'

interface Props {}

const defaultState = {}

export default function SearchOrders({}: Props) {
  const [form, setForm] = useState({ ...defaultState })
  return (
    <div className="search-orders-container">
      <div>Search Orders</div>
    </div>
  )
}
