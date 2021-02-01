import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { formatPrice } from 'utils'

interface Props {
  tableData: any[]
}

export default function SoldDays({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const width = 95
    setColumns([
      {
        Header: '',
        accessor: 'category',
        align: 'right'
      },
      {
        Header: 'SOLD DAYS',
        columns: [
          {
            Header: 'Active',
            accessor: row => formatPrice(row['active']),
            width: 80,
            align: 'right'
          },
          {
            Header: 'Pending',
            accessor: row => formatPrice(row['pending']),
            width: 80,
            align: 'right'
          },
          {
            Header: '0-90',
            accessor: row => formatPrice(row['0-90']),
            width: 80,
            align: 'right'
          },
          {
            Header: '91-180',
            accessor: row => formatPrice(row['91-180']),
            width,
            align: 'right'
          },
          {
            Header: '180-270',
            accessor: row => formatPrice(row['180-270']),
            width,
            align: 'right'
          },
          {
            Header: '271-365',
            accessor: row => formatPrice(row['271-365']),
            width,
            align: 'right'
          }
        ]
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <Table columns={columns} data={data} fetchData={fetchData} width={700} />
  )
}
