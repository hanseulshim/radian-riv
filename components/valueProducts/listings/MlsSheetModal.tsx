import React, { useState, useEffect } from 'react'
import Modal from 'components/common/Modal'
import { MlsSheetInterface, getMlsSheet } from 'api'
import { formatNullString, formatPrice } from 'utils'
import PhotoPlay from './PhotoPlay'
interface Props {
  closeModal: () => void
  mlsNumber: string
}

export default function MlsSheetModal({ closeModal, mlsNumber }: Props) {
  const [mlsSheet, setMlsSheet] = useState<MlsSheetInterface>({
    listingDetail: {
      status: null,
      listDate: null,
      soldDate: null,
      dom: null,
      originalListPrice: null,
      finalListPrice: null,
      soldPrice: null,
      shortSale: null,
      financing: null,
      financingType: null,
      mlsNumber: null,
      reo: null,
      concessions: null
    },
    address: {
      address: null,
      city: null,
      county: null,
      unit: null,
      state: null,
      zip: null
    },
    mlsComments: null,
    interiorFeatures: null,
    additionalFeatures: null,
    propertyInformation: {
      propertyType: null,
      year: null,
      bed: null,
      bath: null,
      totalSqft: null,
      aboveGradeSqft: null,
      lotSize: null,
      lotSizeSf: null,
      lotSizeAc: null,
      garageType: null,
      subType: null,
      numberOfUnits: null,
      style: null,
      fireplace: null,
      sqftSource: null,
      stories: null,
      garage: null,
      parkingSpaces: null,
      garageSf: null,
      opener: null
    },
    exterior: {
      site: null,
      exterior: null,
      outbuilding: null,
      view: null,
      pool: null,
      poolDetails: null,
      waterFrontage: null,
      waterFootage: null,
      lotDescription: null,
      patioDeck: null,
      barnStable: null,
      spaHotTub: null,
      spaHotTubDetails: null,
      dock: null,
      waterAccess: null,
      guestSf: null,
      guestHouse: null
    },
    other: {
      flooring: null,
      roofing: null,
      basement: null,
      basementEntry: null,
      belowGradeSqft: null,
      belowGradeFinishedSqft: null,
      basementFinished: null,
      basementFinishedPercent: null
    },
    taxes: {
      projectSubdivision: null,
      taxes: null,
      taxId: null,
      legalDescription: null,
      taxYear: null,
      zoning: null,
      township: null,
      section: null
    },
    schools: {
      district: null,
      other: null,
      highSchool: null,
      juniorHigh: null,
      elementary: null,
      private: null
    },
    hoa: {
      name: null,
      fee: null,
      contact: null,
      hoa: null,
      duesFrequency: null,
      phone: null
    },
    contact: {
      la: null,
      bkr: null,
      laEmail: null,
      laTel: null,
      bkrTel: null,
      sa: null,
      sBkr: null,
      saEmail: null,
      saTel: null,
      coLa: null,
      coLaTel: null,
      coBkr: null,
      coBkrTel: null,
      mgmt: null,
      mgmtTel: null
    },
    photos: []
  })
  useEffect(() => {
    const mlsSheet = async () => {
      const mls = await getMlsSheet(mlsNumber)
      setMlsSheet(mls)
    }
    mlsSheet()
  }, [])

  const mls = {
    listingDetail: [
      {
        width: 110,
        values: [
          { label: 'Status', value: 'status' },
          { label: 'List Date', value: 'listDate' },
          { label: 'Sold Date', value: 'soldDate' },
          { label: 'DOM', value: 'dom' }
        ]
      },
      {
        width: 190,
        values: [
          {
            label: 'Original List Price',
            value: 'originalListPrice',
            price: true
          },
          { label: 'Final List Price', value: 'finalListPrice', price: true },
          { label: 'Sold Price', value: 'soldPrice', price: true }
        ]
      },
      {
        width: 180,
        values: [
          { label: 'Short Sale', value: 'shortSale' },
          { label: 'Financing/Terms', value: 'financing' },
          { label: 'Financing Type', value: 'financingType' }
        ]
      },
      {
        width: 150,
        values: [
          { label: 'MLS #', value: 'mlsNumber' },
          { label: 'REO', value: 'reo' },
          { label: 'Concessions', value: 'concessions', price: true }
        ]
      }
    ],
    address: [
      {
        width: 110,
        values: [
          { label: 'Address', value: 'address' },
          { label: 'City', value: 'city' },
          { label: 'County', value: 'county' }
        ]
      },
      {
        width: 75,
        values: [
          { label: 'Unit #', value: 'unit' },
          { label: 'State', value: 'state' },
          { label: 'Zip', value: 'zip' }
        ]
      }
    ],
    propertyInformation: [
      {
        width: 185,
        values: [
          { label: 'Property Type', value: 'propertyType' },
          { label: 'Yr Built', value: 'year' },
          { label: 'Bed', value: 'bed' },
          { label: 'Bath', value: 'bath' },
          { label: 'Total Sqft', value: 'totalSqft' },
          { label: 'Above Grade Sqft', value: 'aboveGradeSqft' },
          { label: 'Lot Size', value: 'lotSize' },
          { label: 'Lot Size (SF)', value: 'lotSizeSf' },
          { label: 'Lot Size (Ac)', value: 'lotSizeAc' },
          { label: 'Garage Type', value: 'garageType' }
        ]
      },
      {
        width: 185,
        values: [
          { label: 'Sub Type', value: 'subType' },
          { label: '# of Units', value: 'numberOfUnits' },
          { label: 'Style', value: 'style' },
          { label: 'Fireplace', value: 'fireplace' },
          { label: 'SqFt Source', value: 'sqftSource' },
          { label: 'Stories', value: 'stories' },
          { label: 'Garage/Carport', value: 'garage' },
          { label: 'Parking Spaces', value: 'parkingSpaces' },
          { label: 'Garage SF', value: 'garageSf' },
          { label: 'Opener', value: 'opener' }
        ]
      }
    ],
    exterior: [
      {
        width: 160,
        values: [
          { label: 'Site', value: 'site' },
          { label: 'Exterior', value: 'exterior' },
          { label: 'Outbuilding', value: 'outbuilding' },
          { label: 'View', value: 'view' },
          { label: 'Pool', value: 'pool' },
          { label: 'Details', value: 'poolDetails' },
          { label: 'Water Frontage', value: 'waterFrontage' },
          { label: 'Water Footage', value: 'waterFootage' }
        ]
      },
      {
        width: 160,
        values: [
          { label: 'Lot Description', value: 'lotDescription' },
          { label: 'Patio/Deck', value: 'patioDeck' },
          { label: 'Barn/Stable', value: 'barnStable' },
          { label: 'Spa/Hot Tub', value: 'spaHotTub' },
          { label: 'Details', value: 'spaHotTubDetails' },
          { label: 'Dock', value: 'dock' },
          { label: 'Water Access', value: 'waterAccess' },
          { label: 'Guest SF', value: 'guestSf' },
          { label: 'Guest House', value: 'guestHouse' }
        ]
      }
    ],
    other: [
      {
        width: 115,
        values: [
          { label: 'Flooring', value: 'flooring' },
          { label: 'Roofing', value: 'roofing' },
          { label: 'Basement', value: 'basement' }
        ]
      },
      {
        width: 270,
        values: [
          { label: 'Below Grade Sqft', value: 'belowGradeSqft' },
          {
            label: 'Below Grade Finished Sqft',
            value: 'belowGradeFinishedSqft'
          },
          { label: 'Basement Finished', value: 'basementFinished' },
          { label: 'Basement Finished %', value: 'basementFinishedPercent' }
        ]
      }
    ],
    taxes: [
      {
        width: 205,
        values: [
          { label: 'Project/Subdivision', value: 'projectSubdivision' },
          { label: 'Taxes', value: 'taxes', price: true },
          { label: 'Tax ID (Parcel ID', value: 'taxId' },
          { label: 'Legal Description', value: 'legalDescription' }
        ]
      },
      {
        width: 110,
        values: [
          { label: 'Tax Year', value: 'taxYear' },
          { label: 'Zoning', value: 'zoning' },
          { label: 'Township', value: 'township' },
          { label: 'Section', value: 'section' }
        ]
      }
    ],
    schools: [
      {
        width: 90,
        values: [
          { label: 'District', value: 'district' },
          { label: 'Other', value: 'other' }
        ]
      },
      {
        width: 135,
        values: [
          { label: 'High School', value: 'highSchool' },
          { label: 'Junior High', value: 'juniorHigh' },
          { label: 'Elementary', value: 'elementary' },
          { label: 'Private', value: 'private' }
        ]
      }
    ],
    hoa: [
      {
        width: 150,
        values: [
          { label: 'HOA Name', value: 'name' },
          { label: 'HOA Fee', value: 'fee', price: true },
          { label: 'HOA Contact', value: 'contact' }
        ]
      },
      {
        width: 170,
        values: [
          { label: 'HOA', value: 'hoa' },
          { label: 'Dues Frequency', value: 'duesFrequency' },
          { label: 'HOA Phone', value: 'phone' }
        ]
      }
    ],
    contact: [
      {
        width: 150,
        values: [
          { label: 'LA', value: 'la' },
          { label: 'BKR', value: 'bkr' },
          { label: 'LA Email', value: 'laEmail' },
          { label: 'LA Tel', value: 'laTel' },
          { label: 'BKR Tel', value: 'bkrTel' }
        ]
      },
      {
        width: 150,
        values: [
          { label: 'SA', value: 'sa' },
          { label: 'S BKR', value: 'sBkr' },
          { label: 'SA Email', value: 'saEmail' },
          { label: 'SA Tel', value: 'saTel' },
          { label: 'CO LA', value: 'coLa' }
        ]
      },
      {
        width: 150,
        values: [
          { label: 'CO LA Tel', value: 'coLaTel' },
          { label: 'CO BKR', value: 'coBkr' },
          { label: 'CO BKR Tel', value: 'coBkrTel' },
          { label: 'MGMT', value: 'mgmt' },
          { label: 'MGMT Tel', value: 'mgmtTel' }
        ]
      }
    ]
  }

  const generateColumns = key => {
    return mls[key].map(({ width, values }, index: number) => (
      <div className="column" key={index}>
        {values.map(({ label, value, price }) => (
          <div className="label-row" key={label}>
            <span className="label" style={{ width }}>
              {label}
            </span>
            <span className="value">
              {price
                ? formatNullString(formatPrice(mlsSheet[key][value]))
                : formatNullString(mlsSheet[key][value])}
            </span>
          </div>
        ))}
      </div>
    ))
  }

  return (
    <Modal closeModal={closeModal} title={''} percent={95} id="mls-sheet">
      <div className="mls-container">
        <div className="top-row">
          <h2>MLS Sheet</h2>
          <button className="btn btn-icon dark">
            <span>Export PDF</span>
            <span className="icon-container">
              <img
                src={`${process.env.baseUrl}/images/export-pdf.svg`}
                alt="pdf"
              />
            </span>
          </button>
        </div>
        <h6>Listing Detail</h6>
        <div className="row spacer">{generateColumns('listingDetail')}</div>
        <div className="row">
          <div className="column">
            <h6>Address</h6>
            <div className="row spacer">{generateColumns('address')}</div>
            <div className="row">
              <PhotoPlay photos={mlsSheet.photos} />
            </div>
          </div>
          <div className="column">
            <h6>MLS Comments</h6>
            <div className="row spacer">{mlsSheet.mlsComments}</div>
            <h6>Interior Features</h6>
            <div className="row spacer">{mlsSheet.interiorFeatures}</div>
            <h6>Additional Features</h6>
            <div className="row spacer">{mlsSheet.additionalFeatures}</div>
          </div>
        </div>
      </div>
      <div className="property-info">
        <div className="row">
          <div className="column">
            <h6>Property Information</h6>
            <div className="row spacer">
              {generateColumns('propertyInformation')}
            </div>
            <h6>Other</h6>
            <div className="row spacer">
              {generateColumns('other')}
              <div className="label-row">
                <span className="label" style={{ width: 165 }}>
                  Basement Entry
                </span>
                <span className="value">
                  {formatNullString(mlsSheet.other.basementEntry)}
                </span>
              </div>
            </div>
            <h6>Schools</h6>
            <div className="row spacer">{generateColumns('schools')}</div>
          </div>
          <div className="column">
            <h6>Exterior</h6>
            <div className="row spacer">{generateColumns('exterior')}</div>
            <h6>Taxes</h6>
            <div className="row spacer">{generateColumns('taxes')}</div>
            <h6>HOA</h6>
            <div className="row spacer">{generateColumns('hoa')}</div>
          </div>
        </div>
        <h6>Contact Information</h6>
        <div className="row spacer">{generateColumns('contact')}</div>
        <button className="btn btn-icon dark" style={{ margin: 'auto' }}>
          <span>Export PDF</span>
          <span className="icon-container">
            <img
              src={`${process.env.baseUrl}/images/export-pdf.svg`}
              alt="pdf"
            />
          </span>
        </button>
      </div>
    </Modal>
  )
}
