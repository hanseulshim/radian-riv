import React, { useEffect, useState } from 'react'
import OrderLayout from 'components/layouts/OrderLayout'
import PropertiesTable from 'components/valueProducts/listings/PropertiesTable'
import CompPhotosModal from 'components/valueProducts/listings/CompPhotosModal'
import ExportPdf from 'components/valueProducts/listings/ExportPdf'
import { useOrder } from 'context/OrderProvider'
import {
  getSoldProperties,
  getListedProperties,
  getContractProperties,
  CompPropertyInterface
} from 'api'
import ChangePropertyCharacteristics from 'components/valueProducts/change-property-characteristics'
import { buildPropertyInfoWorkbook } from 'utils'

export default function PropertyInfoPage() {
  const { order } = useOrder()
  const [soldProperties, setSoldProperties] = useState<CompPropertyInterface[]>(
    []
  )
  const [listedProperties, setListedProperties] = useState<
    CompPropertyInterface[]
  >([])
  const [contractProperties, setContractProperties] = useState<
    CompPropertyInterface[]
  >([])
  const [pdfModal, setPdfModal] = useState(false)
  const [propertyCharModal, setPropertyCharModal] = useState(false)
  const [listingSheets, setListingSheets] = useState({
    subject: 0,
    selected: 2,
    all: 1
  })
  const [compPhotosModal, setCompPhotosModal] = useState(false)
  const [currentView, setCurrentView] = useState('Sold')
  const [checkedProperties, setCheckedProperties] = useState<string[]>([])
  const views = ['Sold', 'Listed', 'Under Contract']

  useEffect(() => {
    if (order.ordersId) {
      const getProperties = async () => {
        const sold = await getSoldProperties(order.ordersId)
        setSoldProperties(sold)
        const listed = await getListedProperties(order.ordersId)
        setListedProperties(listed)
        const contract = await getContractProperties(order.ordersId)
        setContractProperties(contract)
      }
      getProperties()
    }
  }, [order])

  const toggleCompPhotosModal = () => {
    if (checkedProperties.length) {
      setCheckedProperties([])
    }
    setCompPhotosModal(!compPhotosModal)
  }

  const togglePdfModal = () => {
    setPdfModal(!pdfModal)
  }

  const togglePropCharModal = () => {
    setPropertyCharModal(!propertyCharModal)
  }

  return (
    <OrderLayout>
      <div className="property-info">
        <div className="property-info-header">
          <h1>RIV Property Info</h1>
          <button className="btn btn-icon">
            <span>Lock</span>
            <span className="icon-container">
              <img src={`${process.env.baseUrl}/images/lock.svg`} alt="lock" />
            </span>
          </button>
        </div>
        <button style={{ marginRight: '1em' }} className="btn btn-small">
          Re-Order RIV
        </button>
        <button style={{ marginRight: '1em' }} className="btn btn-small">
          Order Rental Analysis
        </button>
        <button
          style={{ marginRight: '1em' }}
          className="btn btn-small"
          onClick={togglePropCharModal}
        >
          Change Property Characteristics
        </button>
        <div className="icon-row">
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/download-pdf.svg`}
            onClick={togglePdfModal}
            alt="logo"
          />
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/download-excel.svg`}
            alt="download-excel"
            onClick={() =>
              buildPropertyInfoWorkbook(
                [soldProperties, listedProperties, contractProperties],
                order,
                'AVE_Comparables'
              )
            }
          />
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/aerial-map.svg`}
            alt="aerial-map"
          />
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/cost.svg`}
            alt="cost"
          />
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/property-info.svg`}
            alt="property-info"
          />
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/photos.svg`}
            alt="photos"
            onClick={toggleCompPhotosModal}
          />
        </div>
        <ul style={{ marginTop: '1em' }} className="tab-container">
          {views.map(view => (
            <li
              key={view}
              onClick={() => setCurrentView(view)}
              className={`${view === currentView ? 'active ' : ''}`}
            >
              {view}
            </li>
          ))}
        </ul>
        {currentView === 'Sold' ? (
          <PropertiesTable tableData={soldProperties} view={currentView} />
        ) : currentView === 'Listed' ? (
          <PropertiesTable tableData={listedProperties} view={currentView} />
        ) : (
          <PropertiesTable tableData={contractProperties} view={currentView} />
        )}
        {compPhotosModal && (
          <CompPhotosModal
            closeModal={toggleCompPhotosModal}
            orderId={order.id}
            view={currentView}
          />
        )}
        {pdfModal && (
          <ExportPdf
            closeModal={togglePdfModal}
            listingSheets={listingSheets}
          />
        )}
        {propertyCharModal && (
          <ChangePropertyCharacteristics closeModal={togglePropCharModal} />
        )}
      </div>
    </OrderLayout>
  )
}
