import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { formatPercent } from 'utils'

interface Props {
  tableData: any[]
}

export default function DepressedMarketGridTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const fetchData = useCallback(async () => {
    setColumns([
      {
        Header: '',
        accessor: 'category',
        width: 200,
        align: 'right'
      },
      {
        Header: '# of Listings',
        accessor: 'listingsCount',
        align: 'right',
        width: 125
      },
      {
        Header: '% of Listings',
        accessor: row => {
          return formatPercent(row.listingsPercent)
        },
        align: 'right'
      },
      {
        Header: '# of Pendings',
        accessor: 'pendingsCount',
        align: 'right',
        width: 125
      },
      {
        Header: '% of Pendings',
        accessor: row => {
          return formatPercent(row.pendingsPercent)
        },
        align: 'right'
      },
      {
        Header: '# of Solds',
        accessor: 'soldsCount',
        align: 'right',
        width: 125
      },
      {
        Header: '% of Solds',
        accessor: row => {
          return formatPercent(row.soldsPercent)
        },
        align: 'right'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div style={{ marginTop: '1em' }}>
      <Table columns={columns} data={data} fetchData={fetchData} />
    </div>
  )
}
