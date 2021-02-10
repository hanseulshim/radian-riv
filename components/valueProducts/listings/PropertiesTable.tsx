import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import HistoricalListingModal from './HistoricalListingModal'
import { formatPrice } from 'utils'
import { PropertyInterface } from 'api'
import GalleryModal from './GalleryModal'

interface Props {
  tableData: PropertyInterface[]
  type: string
}

export default function PropertiesTable({ tableData, type }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedProperty, setSelectedProperty] = useState<PropertyInterface>(
    null
  )
  const [historicalListingModal, setHistoricalListingModal] = useState(false)
  const [galleryModal, setGalleryModal] = useState(false)
  const fetchData = useCallback(async () => {
    setColumns([
      {
        Header: 'Street Address',
        accessor: 'address',
        align: 'right',
        width: 210
      },
      {
        Header: 'City',
        accessor: 'city',
        align: 'right',
        width: 200
      },
      {
        Header: 'Zip',
        accessor: 'zip',
        align: 'right',
        width: 100
      },
      {
        Header: 'Bed',
        accessor: 'bed',
        align: 'right',
        width: 75
      },
      {
        Header: 'Bath',
        accessor: 'bath',
        align: 'right',
        width: 75
      },
      {
        Header: 'SqFt',
        accessor: 'sqft',
        align: 'right',
        width: 90
      },
      {
        Header: 'Garage',
        accessor: 'garage',
        align: 'right',
        width: 75
      },
      {
        Header: 'Lot Size',
        accessor: 'lotSize',
        align: 'right',
        width: 90
      },
      {
        Header: 'Year Built',
        accessor: 'yearBuilt',
        align: 'right',
        width: 110
      },
      {
        Header: 'Target Distance',
        accessor: 'targetDistance',
        align: 'right',
        width: 100
      },
      {
        Header: 'List Date',
        accessor: 'listingDate',
        align: 'right'
      },
      {
        Header: 'List Price',
        accessor: row => formatPrice(row.listingPrice),
        align: 'right',
        width: 175
      },
      {
        Header: 'COE Date',
        accessor: 'coeDate',
        align: 'right'
      },
      {
        Header: 'Sold Price',
        accessor: row => formatPrice(row.soldPrice),
        align: 'right',
        width: 175
      },
      {
        Header: 'ACT DOM',
        accessor: 'actDom',
        align: 'right'
      },
      {
        Header: 'TOT DOM',
        accessor: 'totDom',
        align: 'right'
      },
      {
        Header: 'SQFT Price',
        accessor: 'sqftPrice',
        align: 'right'
      },
      {
        Header: '% of Valuation',
        accessor: 'valuationPercent',
        align: 'right'
      },
      {
        Header: 'Property Info',
        accessor: (row: PropertyInterface) => (
          <span
            className="link"
            onClick={() => {
              setHistoricalListingModal(true)
              setSelectedProperty(row)
            }}
          >
            Learn More
          </span>
        ),
        align: 'right'
      },
      {
        Header: 'Images',
        accessor: row => (
          <img
            className="link"
            src={`${process.env.baseUrl}/images/photos-link.svg`}
            onClick={() => {
              setGalleryModal(true)
              setSelectedProperty(row)
            }}
            alt="photos"
          />
        ),
        align: 'right'
      },
      {
        Header: '',
        accessor: 'order',
        align: 'right'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div className="table-spacer">
      <Table columns={columns} data={data} fetchData={fetchData} width={1050} />
      {selectedProperty && historicalListingModal && (
        <HistoricalListingModal
          closeModal={() => {
            setHistoricalListingModal(false)
            setSelectedProperty(null)
          }}
          property={selectedProperty}
          type={type}
        />
      )}
      {selectedProperty && galleryModal && (
        <GalleryModal
          photos={selectedProperty.photos}
          closeModal={() => {
            setGalleryModal(false)
            setSelectedProperty(null)
          }}
        />
      )}
    </div>
  )
}
