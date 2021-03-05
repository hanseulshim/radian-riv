import { useEffect, useState } from 'react'
import {
  changePropertyCharacteristics,
  getPropertyCharacteristicsSources,
  getOrderProperties,
  OrderPropertyInterface,
  PropertyCharacteristicsInterface,
  getOrder
} from 'api'
import { useOrder } from 'context/OrderProvider'
import { validateForm } from 'utils'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'
import SourceTable from './SourceTable'
import EditPropertyCharacteristics from './EditPropertyCharacteristics'
import EditPropertyOptions from './EditPropertyOptions'

interface Props {
  closeModal: () => void
}

const defaultCharState = {
  bed: '',
  bath: '',
  sqft: '',
  units: '',
  garage: '',
  lotSize: '',
  year: ''
}

export default function ChangePropertyCharacteristics({ closeModal }: Props) {
  const { order, setOrder } = useOrder()
  const [orderProps, setOrderProps] = useState<OrderPropertyInterface>({
    id: null,
    bed: null,
    bath: null,
    sqft: null,
    units: null,
    garage: null,
    lotSize: null,
    year: null,
    source: null,
    propertyType: null,
    compsBack: null,
    asOfDate: null
  })
  const [inputs, setInputs] = useState({
    propertyType: '',
    monthsBack: '',
    asOfDate: ''
  })

  const [selectedSource, setSelectedSource] = useState('')
  const [characteristics, setCharacteristics] = useState({
    ...defaultCharState
  })
  const [tableData, setTableData] = useState<
    PropertyCharacteristicsInterface[]
  >([])
  const [error, setError] = useState({ asOfDate: '', year: '' })
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const getTableData = async () => {
      const data = await getPropertyCharacteristicsSources()
      setTableData(data)
    }
    getTableData()
  }, [])

  useEffect(() => {
    const getOrderProps = async () => {
      if (order.id) {
        const orderProperties = await getOrderProperties(order.id)
        setOrderProps(orderProperties)
      }
    }
    getOrderProps()
  }, [order])

  const onSubmit = async () => {
    const errorObj = validateForm({
      asOfDate: inputs.asOfDate,
      year: characteristics.year
    })

    if (Object.keys(errorObj).length) {
      setError(errorObj)
    } else {
      try {
        setAlert(null)
        const isUserOrAppraisal =
          selectedSource === 'User' || selectedSource === 'Appraisal'
        const propertiesToPass = {}
        if (isUserOrAppraisal) {
          Object.keys(characteristics).map(prop => {
            propertiesToPass[prop] =
              parseInt(characteristics[prop]) || order[prop]
          })
        } else {
          const sourceData = tableData.find(
            row => row.source === selectedSource
          )
          Object.keys(sourceData).map(prop => {
            propertiesToPass[prop] = sourceData[prop]
          })
        }
        const payload = {
          ...orderProps,
          ...propertiesToPass,
          source: selectedSource,
          propertyType: inputs.propertyType,
          compsBack: inputs.monthsBack,
          asOfDate: inputs.asOfDate
        }
        await changePropertyCharacteristics(payload)
        const newOrder = await getOrder(order.id)
        setOrder(newOrder)
        setAlert({
          type: 'success',
          message: 'Property characteristics successfully updated'
        })
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
  }

  const setCharacteristicState = (key: string, value: number) => {
    if (key === 'year') {
      setError({
        ...error,
        year: ''
      })
    }
    const stateCopy = {
      ...characteristics
    }
    stateCopy[key] = value
    setCharacteristics(stateCopy)
  }

  const { bed, bath, sqft, units, garage, lotSize, year, source } = orderProps

  return (
    <Modal
      title="Change Property Characteristics"
      width={1200}
      closeModal={closeModal}
    >
      <Form id="change-prop-characteristics" onSubmit={onSubmit} alert={alert}>
        <div className="change-prop-container">
          <p>
            <span className="title">Source:</span>
            {source}
          </p>
          <div className="stats-row">
            <div className="stat">
              <span className="title">Bed:</span>
              {bed}
            </div>
            <div className="stat">
              <span className="title">Bath:</span>
              {bath}
            </div>
            <div className="stat">
              <span className="title">SqFt:</span>
              {sqft}
            </div>
            <div className="stat">
              <span className="title">Units:</span>
              {units}
            </div>
            <div className="stat">
              <span className="title">Garage:</span>
              {garage}
            </div>
            <div className="stat">
              <span className="title">Lot Size:</span>
              {lotSize}
            </div>
            <div className="stat">
              <span className="title">Yr. Built:</span>
              {year}
            </div>
          </div>
          <EditPropertyOptions
            inputs={inputs}
            setInputs={setInputs}
            error={error}
            setError={setError}
            orderProps={orderProps}
          />
          <SourceTable
            tableData={tableData}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
          />
          <EditPropertyCharacteristics
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            characteristics={characteristics}
            setCharacteristics={setCharacteristicState}
            error={error}
          />
        </div>
        <button
          className="btn"
          onClick={onSubmit}
          type="submit"
          disabled={selectedSource === ''}
        >
          Submit
        </button>
      </Form>
    </Modal>
  )
}
