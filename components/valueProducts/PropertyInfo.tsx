import React, { useState } from 'react'
import { useValueProduct } from 'context/ValueProductProvider'
import ExportPdf from './ExportPdf'

export default function PropertyInfo() {
  const { propertyInfo } = useValueProduct()
  const [pdfModal, setPdfModal] = useState(false)
  const [listingSheets, setListingSheets] = useState({
    subject: 0,
    selected: 2,
    all: 1
  })

  const togglePdfModal = () => {
    setPdfModal(!pdfModal)
  }

  return (
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
      <button style={{ marginRight: '1em' }} className="btn btn-small">
        Change Property Characteristics
      </button>
      <div className="icon-row">
        <img
          className="icon"
          src={`${process.env.baseUrl}/images/download-pdf.svg`}
          alt="logo"
          onClick={togglePdfModal}
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
        />
      </div>
      {pdfModal && (
        <ExportPdf closeModal={togglePdfModal} listingSheets={listingSheets} />
      )}
    </div>
  )
}
