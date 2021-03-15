import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import HistoricalListingModal from 'components/valueProducts/listings/HistoricalListingModal'
import { formatPrice } from 'utils'
import { IFlipProperty } from 'api'

interface Props {
  tableData: IFlipProperty[]
}

export default function FlipTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [property, setProperty] = useState<IFlipProperty>(null)

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
        accessor: 'yrBuilt',
        align: 'right',
        width: 110
      },
      {
        Header: 'Target Distance',
        accessor: 'proximity',
        align: 'right',
        width: 100
      },
      {
        Header: 'COE 1 Sold Date',
        accessor: 'coe1SoldDate',
        align: 'right'
      },
      {
        Header: 'COE 1 Sold Price',
        accessor: (property: IFlipProperty) =>
          formatPrice(property.coe1SoldPrice),
        align: 'right',
        width: 175
      },
      {
        Header: 'COE 2 Sold Date',
        accessor: 'coe2SoldDate',
        align: 'right'
      },
      {
        Header: 'COE 2 Sold Price',
        accessor: (property: IFlipProperty) =>
          formatPrice(property.coe2SoldPrice),
        align: 'right',
        width: 175
      },
      {
        Header: 'Days from Flip',
        accessor: 'daysFromFlip',
        align: 'right'
      },
      {
        Header: 'Image & Info',
        accessor: (property: IFlipProperty) => (
          <img
            className="link"
            src={`${process.env.baseUrl}/images/photos-link.svg`}
            alt="photos"
            onClick={() => {
              setProperty(property)
            }}
          />
        ),
        align: 'center'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div className="flip-table">
      <Table columns={columns} data={data} fetchData={fetchData} width={1050} />
      {property && (
        <HistoricalListingModal
          closeModal={() => setProperty(null)}
          resultsId={property.resultsId}
          title={property.address}
        />
      )}
    </div>
  )
}
