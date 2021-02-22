import { useState } from 'react'
import CustomSelect from 'components/common/CustomSelect'

interface Props {}

const defaultState = {
  productType: null,
  poolName: null,
  poolNameInput: '',
  orderType: '',
  billable: true,
  fee: '',
  loanNumber: '',
  zip: '',
  address: '',
  city: '',
  state: '',
  restrictComps: null,
  compsGoingBack: null,
  bed: '',
  bath: '',
  sqft: '',
  lotSize: '',
  garage: '',
  yearBuilt: '',
  asOfDate: '',
  contactName: '',
  contactPhone: '',
  clientName: ''
}

export default function NewOrder({}: Props) {
  const [form, setForm] = useState({ ...defaultState })
  return (
    <div className="new-order-container">
      <div className="product-pool-selection">
        <CustomSelect
          label="Product Type"
          onChange={opt => setForm({ ...form, productType: opt })}
          value={form.productType}
          options={[
            {
              label: 'Radian Interactive Value',
              value: 'Radian Interactive Value'
            },
            { label: 'Rental Analysis', value: 'Rental Analysis' }
          ]}
          classNamePrefix="transparent"
        />
        <CustomSelect
          label="Pool Name"
          onChange={opt => setForm({ ...form, poolName: opt })}
          value={form.poolName}
          options={[
            {
              label: 'Pool 1',
              value: 'Pool 1'
            },
            { label: 'Pool 2', value: 'Pool 2' }
          ]}
          classNamePrefix="transparent"
          placeholder="Select existing pool name"
        />
      </div>
    </div>
  )
}
