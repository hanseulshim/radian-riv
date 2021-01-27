import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import numeral from 'numeral'

export default function DepressedMarketGrid({ tableData }) {
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
        align: 'right'
      },
      {
        Header: '% of Listings',
        accessor: row => {
          return row.listingsPercent !== null
            ? numeral(row.listingsPercent).format('0.00%')
            : row.listingsPercent
        },
        align: 'right'
      },
      {
        Header: '# of Pendings',
        accessor: 'pendingsCount',
        align: 'right'
      },
      {
        Header: '% of Pendings',
        accessor: row => {
          return row.pendingsPercent !== null
            ? numeral(row.pendingsPercent).format('0.00%')
            : row.pendingsPercent
        },
        align: 'right'
      },
      {
        Header: '# of Solds',
        accessor: 'soldsCount',
        align: 'right'
      },
      {
        Header: '% of Solds',
        accessor: row => {
          return row.soldsPercent !== null
            ? numeral(row.soldsPercent).format('0.00%')
            : row.soldsPercent
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
