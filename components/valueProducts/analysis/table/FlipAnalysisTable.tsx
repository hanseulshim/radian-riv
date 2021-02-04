import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { formatPercent, formatPrice } from 'utils'

interface Props {
  tableData: any[]
  flipType: string
}

export default function FlipAnalysisTable({ tableData, flipType }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const width = 90
    const parseValue = (key: string, value: number) => {
      return key.includes('Number')
        ? value
        : key.includes('%') || key.includes('Cap')
        ? formatPercent(value)
        : formatPrice(value)
    }
    setColumns([
      {
        Header: flipType,
        columns: [
          {
            Header: 'Market Area Flip Report',
            accessor: 'report',
            align: 'right'
          },
          {
            Header: '0-90',
            accessor: row => parseValue(row.report, row['0-90']),
            width,
            align: 'right'
          },
          {
            Header: '91-180',
            accessor: row => parseValue(row.report, row['91-180']),
            width,
            align: 'right'
          },
          {
            Header: '180-270',
            accessor: row => parseValue(row.report, row['180-270']),
            width,
            align: 'right'
          },
          {
            Header: '271-365',
            accessor: row => parseValue(row.report, row['271-365']),
            width,
            align: 'right'
          }
        ]
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div style={{ marginRight: flipType.includes('SOLD') ? '10px' : 0 }}>
      <Table columns={columns} data={data} fetchData={fetchData} width={520} />
    </div>
  )
}
