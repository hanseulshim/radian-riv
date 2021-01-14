import { useState } from 'react'
import CountyLayout from 'components/layouts/CountyLayout'
import AnnualChangeChart from 'components/trending/home-price/AnnualChangeChart'

const defaultState = {
  state: null,
  county: null,
  zip: null,
  type: null,
  msa: null
}

interface Option {
  label: string
  value: string
}

export default function HomePrice() {
  const [form, setForm] = useState({ ...defaultState })

  const onSelectChange = (opt: Option, key: string) => {
    const stateCopy = { ...form }
    if (key === 'state') {
      setForm({ ...defaultState, state: opt })
    }
    if (key === 'county') {
      setForm({ ...stateCopy, county: opt, zip: null, type: null, msa: null })
    }
    if (key === 'zip') {
      setForm({ ...stateCopy, zip: opt, type: null, msa: null })
    }
    if (key === 'type') {
      setForm({ ...stateCopy, type: opt })
    }
    if (key === 'msa') {
      setForm({ ...stateCopy, msa: opt })
    }
  }

  return (
    <CountyLayout label="Home Price">
      <AnnualChangeChart />
    </CountyLayout>
  )
}
