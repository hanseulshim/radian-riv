import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import numeral from 'numeral'

export default function SoldDays({ tableData }) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const getValue = (row, key: string) => {
    if (row.category === 'Median DOM') {
      return row[key]
    }
    return row[key] ? numeral(row[key]).format('$0,') : row[key]
  }

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
            accessor: row => getValue(row, 'active'),
            width: 80,
            align: 'right'
          },
          {
            Header: 'Pending',
            accessor: row => getValue(row, 'pending'),
            width: 80,
            align: 'right'
          },
          {
            Header: '0-90',
            accessor: row => getValue(row, '0-90'),
            width: 80,
            align: 'right'
          },
          {
            Header: '91-180',
            accessor: row => getValue(row, '91-180'),
            width,
            align: 'right'
          },
          {
            Header: '180-270',
            accessor: row => getValue(row, '180-270'),
            width,
            align: 'right'
          },
          {
            Header: '271-365',
            accessor: row => getValue(row, '271-365'),
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
