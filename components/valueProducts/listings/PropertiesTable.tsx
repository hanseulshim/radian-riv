import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import HistoricalListingModal from './HistoricalListingModal'
import { formatPrice } from 'utils'
import { CompPropertyInterface } from 'api'

interface Props {
  tableData: CompPropertyInterface[]
  view: string
}

export default function PropertiesTable({ tableData, view }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [property, setProperty] = useState<CompPropertyInterface>(null)
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
        accessor: 'year',
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
        Header: 'List Date',
        accessor: 'listDate',
        align: 'right'
      },
      {
        Header: 'List Price',
        accessor: (property: CompPropertyInterface) =>
          formatPrice(property.listPrice),
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
        accessor: (property: CompPropertyInterface) =>
          formatPrice(property.soldPrice),
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
        accessor: 'dom',
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
        Header: 'Image & Info',
        accessor: (property: CompPropertyInterface) => (
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
      },
      {
        Header: 'Rank',
        accessor: 'rank',
        align: 'right'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div className="table-spacer">
      <Table columns={columns} data={data} fetchData={fetchData} width={1050} />
      {property && (
        <HistoricalListingModal
          closeModal={() => setProperty(null)}
          resultsId={+property.id}
          title={`${view} #${property.rank}`}
        />
      )}
    </div>
  )
}
