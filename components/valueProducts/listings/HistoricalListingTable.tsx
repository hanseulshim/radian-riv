import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { IHistoricalListingProperty } from 'api'

interface Props {
  tableData: IHistoricalListingProperty[]
}

export default function HistoricalListingTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    setColumns([
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
        width: 75
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
        width: 100
      },
      {
        Header: 'Year Built',
        accessor: 'year',
        align: 'right',
        width: 100
      },
      {
        Header: 'Sale Type',
        accessor: 'financeTypeValue',
        align: 'right',
        width: 125
      }
    ])
    setData(tableData)
  }, [tableData])

  return <Table columns={columns} data={data} fetchData={fetchData} />
}
