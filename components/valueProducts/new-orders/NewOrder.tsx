import { useState, useEffect } from 'react'
import CustomSelect from 'components/common/CustomSelect'
import Radio from 'components/common/Radio'
import Checkbox from 'components/common/Checkbox'
import Input from 'components/common/Input'
import { useAuth } from 'context/auth/AuthProvider'
import { newOrderOptions, INewOrderOptions, IGreenForm } from 'api'
import BulkOrder from './BulkOrder'
import SingleOrder from './single-order'

export default function NewOrder() {
  const {
    auth: { user }
  } = useAuth()
  const [options, setOptions] = useState<INewOrderOptions>({
    orderedByUsers: [],
    clients: [],
    productTypes: [],
    pools: []
  })
  const [orderedByUser, setOrderedByUser] = useState(null)
  const [client, setClient] = useState(null)
  const [productType, setProductType] = useState(null)
  const [selectedPool, setSelectedPool] = useState(null)
  const [poolInput, setPoolInput] = useState('')
  const [billable, setBillable] = useState(true)
  const [fee, setFee] = useState('')
  const [comment, setComment] = useState('')
  const [view, setView] = useState('Single Order')
  const [greenForm, setGreenForm] = useState<IGreenForm>({
    orderedByUserId: null,
    clientId: null,
    productTypeId: null,
    poolId: null,
    poolName: null,
    billable: true,
    fee: null,
    comment: null
  })

  useEffect(() => {
    const getDefaults = async () => {
      const options = await newOrderOptions()
      const foundUser = options.orderedByUsers.find(
        option => option.value === user.userid_ssid
      )
      const foundClient = options.clients.find(
        option => option.value === `${user.clientid_ssid}`
      )
      const foundProductType = options.productTypes[0]
      if (foundUser) {
        setOrderedByUser(foundUser)
      }
      if (foundClient) {
        setClient(foundClient)
      }
      if (foundProductType) {
        setProductType(foundProductType)
      }
      setOptions(options)
    }
    getDefaults()
  }, [user])

  useEffect(() => {
    setGreenForm({
      orderedByUserId: orderedByUser ? orderedByUser.value : null,
      clientId: client ? client.value : null,
      productTypeId: productType ? productType.value : null,
      poolId: selectedPool ? selectedPool.value : null,
      poolName: poolInput,
      billable,
      fee,
      comment
    })
  }, [
    orderedByUser,
    client,
    productType,
    selectedPool,
    poolInput,
    billable,
    fee,
    comment
  ])

  return (
    <div>
      <div className="flex space-x-8">
        <Radio
          onChange={e => setView(e.target.value)}
          value={'Single Order'}
          checked={view === 'Single Order'}
          label={'Single Order'}
        />
        <Radio
          onChange={e => setView(e.target.value)}
          value={'Bulk Order'}
          checked={view === 'Bulk Order'}
          label={'Bulk Order'}
        />
      </div>
      <h2 className="mb-4">{view}</h2>
      <div className="flex flex-col bg-nebula py-6 px-10 -mx-10 mb-10">
        <div className="flex space-x-8 mb-10">
          <div className="w-300">
            <CustomSelect
              label="Ordered By"
              placeholder="Ordered By..."
              onChange={opt => setOrderedByUser(opt)}
              value={orderedByUser}
              options={options.orderedByUsers}
              classNamePrefix="transparent"
            />
          </div>
          <div className="w-450">
            <CustomSelect
              label="Client"
              onChange={opt => setClient(opt)}
              value={client}
              options={options.clients}
              classNamePrefix="transparent"
              placeholder="Select client"
            />
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="w-300">
            <CustomSelect
              label="Product Type"
              placeholder="Product Type"
              onChange={opt => setProductType(opt)}
              value={productType}
              options={options.productTypes}
              classNamePrefix="transparent"
              id="SO-select-product-type"
            />
          </div>
          <div className="w-450 flex">
            <div className="w-200 transparent -mt-4 mr-4">
              <Input
                label="Enter pool name"
                value={poolInput}
                error={''}
                onChange={e => {
                  setPoolInput(e.target.value)
                  if (selectedPool) {
                    setSelectedPool(null)
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="Pool Name"
                onChange={opt => {
                  setSelectedPool(opt)
                  if (poolInput) {
                    setPoolInput('')
                  }
                }}
                value={selectedPool}
                options={options.pools}
                classNamePrefix="transparent"
                placeholder="Select pool"
                id="SO-select-pool"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center transparent">
          <Checkbox
            label="Billable"
            checked={billable}
            onChange={e => setBillable(e.target.checked)}
          />
          <div className="w-200 mb-3 ml-4">
            <Input
              label="Fee"
              value={fee}
              error={''}
              onChange={e => setFee(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="max-w-screen-md">
          <textarea
            placeholder="Comment Field..."
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
        </div>
      </div>
      {view === 'Single Order' ? (
        <SingleOrder greenForm={greenForm} />
      ) : (
        <BulkOrder greenForm={greenForm} />
      )}
    </div>
  )
}
