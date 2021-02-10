import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { formatPercent } from 'utils'

interface Props {
  listingPrice: {
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }
  type: string
}

export default function ListPriceTable({ type, listingPrice }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const tableData = [{ ...listingPrice }]
    setColumns([
      {
        Header: `MEDIAN SOLD PRICE AS % OF ${type} LIST PRICE`,
        columns: [
          {
            Header: 'Most Recent 90 Days',
            accessor: row => formatPercent(row['0-90']),
            align: 'right',
            width: 130
          },
          {
            Header: 'Prior 91 to 180 Days',
            accessor: row => formatPercent(row['91-180']),
            align: 'right',
            width: 100
          },
          {
            Header: 'Prior 181 to 270 Days',
            accessor: row => formatPercent(row['180-270']),
            align: 'right',
            width: 110
          },
          {
            Header: 'Prior 271 to 360 Days',
            accessor: row => formatPercent(row['271-365']),
            align: 'right'
          }
        ]
      }
    ])
    setData(tableData)
  }, [listingPrice])

  return (
    <div style={{ marginRight: type === 'FINAL' ? '1em' : 0 }}>
      <Table columns={columns} data={data} fetchData={fetchData} />
    </div>
  )
}
