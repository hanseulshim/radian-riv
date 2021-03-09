import { useState, useEffect } from 'react'
import CustomSelect from 'components/common/CustomSelect'
import Radio from 'components/common/Radio'
import Checkbox from 'components/common/Checkbox'
import Input from 'components/common/Input'
import BulkOrder from './BulkOrder'
import SingleOrder from './single-order'
import { getFilterDefaults, submitSingleOrder, Option } from 'api'
import Form from 'components/common/Form'
import { validateForm } from 'utils/validation'
import Suggestions from './single-order/Suggestions'
import SetUserDefaultsModal from './SetUserDefaultsModal'

interface Props {}

const defaultState = {
  orderedBy: null,
  client: null,
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
  state: null,
  restrictComps: null,
  compsBack: null,
  bed: '',
  bath: '',
  sqft: '',
  lotSize: '',
  garage: '',
  year: '',
  asOfDate: '',
  contactName: '',
  contactPhone: '',
  clientName: '',
  file: null,
  comment: ''
}

const reqFieldsSingle = {
  loanNumber: true,
  address: true,
  zip: true,
  city: true,
  state: true
}

const reqFieldsBulk = {
  file: true
}

export default function NewOrder({}: Props) {
  const [form, setForm] = useState({ ...defaultState })
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [view, setView] = useState('Single Order')
  const [showFilters, setShowFilters] = useState(false)
  const [billable, setBillable] = useState(false)
  const [fee, setFee] = useState('')
  const [userDefaultsModal, setUserDefaultsModal] = useState(false)

  useEffect(() => {
    const getDefaults = async () => {
      const filterDefaults = await getFilterDefaults()
      setForm({
        ...form,
        restrictComps: filterDefaults.restrict_comps,
        compsBack: filterDefaults.time_going_back
      })
    }
    getDefaults()
  }, [])

  const toggleUserDefaultModal = () => {
    setUserDefaultsModal(!userDefaultsModal)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setForm({ ...form, [key]: e.target.value })
  }

  const handleSelectChange = (opt: Option, key = 'string') => {
    setForm({ ...form, [key]: opt })
  }

  const setCurrentView = (e: any) => {
    setView(e.target.value)
    setAlert(null)
  }

  const onSubmit = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const reqFields = view === 'Single Order' ? reqFieldsSingle : reqFieldsBulk
    const errorObj = validateForm(form, reqFields)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const response = await submitSingleOrder(form)
        if (response) {
          setAlert({ type: 'success', message: response })
        }
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <div className="new-order-container">
      <Form onSubmit={onSubmit} id="single-order-form" alert={alert}>
        <div className="product-pool-selection">
          <CustomSelect
            label="Ordered By"
            placeholder="Ordered By..."
            onChange={opt => setForm({ ...form, orderedBy: opt })}
            value={form.orderedBy}
            options={[]}
            classNamePrefix="transparent"
          />
          <CustomSelect
            label="Client"
            onChange={opt => setForm({ ...form, client: opt })}
            value={form.client}
            options={[]}
            classNamePrefix="transparent"
            placeholder="Select client"
          />
        </div>
        <div className="product-pool-selection">
          <CustomSelect
            label="Product Type"
            placeholder="Product Type"
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
            id="SO-select-product-type"
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
            id="SO-select-pool"
          />
        </div>
        <div className="radio-row">
          <Radio
            onChange={e => setCurrentView(e)}
            value={'Single Order'}
            checked={view === 'Single Order'}
            label={'Single Order'}
          />
          <Radio
            onChange={e => setCurrentView(e)}
            value={'Bulk Order'}
            checked={view === 'Bulk Order'}
            label={'Bulk Order'}
          />
        </div>
        <h2>{view}</h2>
        <button
          className="btn btn-small user-defaults"
          onClick={toggleUserDefaultModal}
        >
          Set User Defaults
        </button>
        <div className="option-container">
          {view === 'Single Order' && (
            <>
              <Checkbox
                label="Show Advanced Filters"
                checked={showFilters}
                onChange={e => setShowFilters(e.target.checked)}
              />
            </>
          )}
          <div className="billable-row">
            <Checkbox
              label="Billable"
              checked={billable}
              onChange={e => setBillable(e.target.checked)}
            />
            <Input
              label="Fee"
              value={fee}
              error={''}
              onChange={e => setFee(e.target.value)}
              type="number"
            />
          </div>
          {view === 'Single Order' ? (
            <SingleOrder
              form={form}
              setForm={setForm}
              showFilters={showFilters}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              error={error}
              onSubmit={onSubmit}
              setAlert={setAlert}
            />
          ) : (
            <BulkOrder form={form} setForm={setForm} onSubmit={onSubmit} />
          )}
        </div>
      </Form>
      {view === 'Single Order' && <Suggestions form={form} setForm={setForm} />}
      {userDefaultsModal && (
        <SetUserDefaultsModal closeModal={toggleUserDefaultModal} />
      )}
    </div>
  )
}
