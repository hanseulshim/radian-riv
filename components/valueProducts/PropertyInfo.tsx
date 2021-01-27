import React from 'react'
import { useValueProduct } from 'context/ValueProductProvider'

export default function PropertyInfo() {
  const { propertyInfo } = useValueProduct()
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
    </div>
  )
}
