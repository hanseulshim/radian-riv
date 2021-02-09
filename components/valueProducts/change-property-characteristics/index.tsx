import { useEffect, useState } from 'react'
import {
  changePropertyCharacteristics,
  getPropertyCharacteristicsSources
} from 'api'
import { useValueProduct } from 'context/ValueProductProvider'
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
  yearBuilt: ''
}

export default function ChangePropertyCharacteristics({ closeModal }: Props) {
  const { propertyInfo, setPropertyInfo } = useValueProduct()
  const [inputs, setInputs] = useState({
    propertyType: '',
    monthsBack: '',
    asOfDate: ''
  })

  const [selectedSource, setSelectedSource] = useState('')
  const [characteristics, setCharacteristics] = useState({
    ...defaultCharState
  })
  const [tableData, setTableData] = useState([])
  const [error, setError] = useState({ asOfDate: '', yearBuilt: '' })
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const getTableData = async () => {
      const data = await getPropertyCharacteristicsSources()
      setTableData(data)
    }
    getTableData()
  }, [])

  useEffect(() => {
    if (propertyInfo.id) {
      setSelectedSource(propertyInfo.source)
    }
  }, [propertyInfo])

  const onSubmit = async () => {
    const errorObj = validateForm({
      asOfDate: inputs.asOfDate,
      yearBuilt: characteristics.yearBuilt
    })

    if (Object.keys(errorObj).length) {
      setError(errorObj)
    } else {
      try {
        const isUserOrAppraisal =
          selectedSource === 'User' || selectedSource === 'Appraisal'
        const propertiesToPass = {}
        if (isUserOrAppraisal) {
          Object.keys(characteristics).map(prop => {
            propertiesToPass[prop] =
              parseInt(characteristics[prop]) || propertyInfo[prop]
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
          ...propertyInfo,
          ...propertiesToPass,
          source: selectedSource,
          propertyType: inputs.propertyType,
          compsGoingBack: inputs.monthsBack,
          asOfDate: inputs.asOfDate
        }
        const newPropertyInfo = await changePropertyCharacteristics(payload)
        setPropertyInfo(newPropertyInfo)
        setAlert({
          type: 'success',
          message: 'Property characteristics successfully updated'
        })
      } catch (e) {
        setAlert({ type: 'error', message: e })
      }
    }
  }

  const setCharacteristicState = (key: string, value: number) => {
    if (key === 'yearBuilt') {
      setError({
        ...error,
        yearBuilt: ''
      })
    }
    const stateCopy = {
      ...characteristics
    }
    stateCopy[key] = value
    setCharacteristics(stateCopy)
  }

  const {
    bed,
    bath,
    sqft,
    units,
    garage,
    lotSize,
    yearBuilt,
    source
  } = propertyInfo

  return (
    <Modal
      title="Change Property Characteristics"
      width={1100}
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
              {yearBuilt}
            </div>
          </div>
          <EditPropertyOptions
            inputs={inputs}
            setInputs={setInputs}
            error={error}
            setError={setError}
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
        <button className="btn" onClick={onSubmit} type="submit">
          Submit
        </button>
      </Form>
    </Modal>
  )
}
