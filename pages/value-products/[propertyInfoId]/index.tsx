import React, { useEffect, useState } from 'react'
import ValueProductLayout from 'components/layouts/ValueProductLayout'
import SoldProperties from 'components/valueProducts/listings/SoldProperties'
import ListedProperties from 'components/valueProducts/listings/ListedProperties'
import ContractProperties from 'components/valueProducts/listings/ContractProperties'
import CompPhotosModal from 'components/valueProducts/listings/CompPhotosModal'
import ExportPdf from 'components/valueProducts/listings/ExportPdf'
import { useValueProduct } from 'context/ValueProductProvider'
import {
  getSoldProperties,
  getListedProperties,
  getContractProperties,
  PropertyInterface
} from 'api'
import ChangePropertyCharacteristics from 'components/valueProducts/change-property-characteristics'

export default function PropertyInfoPage() {
  const { propertyInfo } = useValueProduct()
  const [soldProperties, setSoldProperties] = useState<PropertyInterface[]>([])
  const [listedProperties, setListedProperties] = useState<PropertyInterface[]>(
    []
  )
  const [contractProperties, setContractProperties] = useState<
    PropertyInterface[]
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
    if (propertyInfo.id) {
      const getProperties = async () => {
        const sold = await getSoldProperties(propertyInfo.id)
        setSoldProperties(sold)
        const listed = await getListedProperties(propertyInfo.id)
        setListedProperties(listed)
        const contract = await getContractProperties(propertyInfo.id)
        setContractProperties(contract)
      }
      getProperties()
    }
  }, [propertyInfo])

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
    <ValueProductLayout>
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
          <SoldProperties properties={soldProperties} />
        ) : currentView === 'Listed' ? (
          <ListedProperties properties={listedProperties} />
        ) : (
          <ContractProperties properties={contractProperties} />
        )}
        {compPhotosModal && (
          <CompPhotosModal
            closeModal={toggleCompPhotosModal}
            checkedProperties={checkedProperties}
            setCheckedProperties={setCheckedProperties}
            properties={
              currentView === 'Sold'
                ? soldProperties
                : currentView === 'Listed'
                ? listedProperties
                : contractProperties
            }
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
    </ValueProductLayout>
  )
}
