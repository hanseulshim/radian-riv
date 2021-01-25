import React from 'react'

export default function PropertyInfo() {
  return (
    <div className="property-info">
      <div className="property-info-header">
        <h1>RIV Property Info</h1>
        <button className="btn btn-primary lock-button">
          <span>Lock</span>
          <div className="lock-icon">
            <img src={`${process.env.baseUrl}/images/lock.svg`} alt="lock" />
          </div>
        </button>
      </div>
      <button style={{ marginRight: '1em' }} className="btn btn-primary">
        Re-Order RIV
      </button>
      <button style={{ marginRight: '1em' }} className="btn btn-primary">
        Order Rental Analysis
      </button>
      <button style={{ marginRight: '1em' }} className="btn btn-primary">
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
