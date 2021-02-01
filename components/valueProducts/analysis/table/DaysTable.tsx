import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'

interface Props {
  tableData: any[]
}

export default function DaysTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const width = 50
    setColumns([
      {
        Header: 'Days',
        accessor: 'days',
        align: 'right'
      },
      {
        Header: '0-90',
        accessor: '0-90',
        width,
        align: 'right'
      },
      {
        Header: '91-180',
        accessor: '91-180',
        width,
        align: 'right'
      },
      {
        Header: '180-270',
        accessor: '180-270',
        width,
        align: 'right'
      },
      {
        Header: '271-365',
        accessor: '271-365',
        width,
        align: 'right'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div className="table-spacer">
      <Table columns={columns} data={data} fetchData={fetchData} width={700} />
    </div>
  )
}
