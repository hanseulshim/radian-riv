import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import { formatPrice } from 'utils'

interface Props {
  tableData: any[]
  month: string
  label: string
}

export default function MedianSalePriceTable({
  tableData,
  month,
  label
}: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const cols = [
      {
        Header: label,
        columns: [
          {
            Header: 'Contract Date',
            accessor: 'contractDate',
            align: 'right',
            width: 130
          },
          {
            Header: 'Number Pendings',
            accessor: 'numberPendings',
            align: 'right',
            width: 85
          },
          {
            Header: 'Number of Sales',
            accessor: 'numberSales',
            align: 'right',
            width: 85
          },
          {
            Header: 'Median Value',
            accessor: row => {
              return formatPrice(row.medianValue)
            },
            align: 'right',
            width: 100
          }
        ]
      }
    ]
    if (month !== 'one') {
      cols[0].columns.splice(1, 1)
    }
    setColumns(cols)
    setData(tableData)
  }, [tableData])

  return (
    <div className={`table-wrapper ${month}`}>
      <Table columns={columns} data={data} fetchData={fetchData} />
    </div>
  )
}
