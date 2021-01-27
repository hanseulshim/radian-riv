import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import numeral from 'numeral'

interface Props {
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export default function OriginalListPriceTable(props: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const getValue = (row, key: string) => {
    return row[key] ? numeral(row[key]).format('0[.]00%') : row[key]
  }

  const fetchData = useCallback(async () => {
    const tableData = [{ ...props }]
    setColumns([
      {
        Header: 'MEDIAN SOLD PRICE AS % OF ORIGINAL LIST PRICE',
        columns: [
          {
            Header: 'Most Recent 90 Days',
            accessor: row => getValue(row, '0-90'),
            align: 'right'
          },
          {
            Header: 'Prior 91 to 180 Days',
            accessor: row => getValue(row, '91-180'),
            align: 'right'
          },
          {
            Header: 'Prior 181 to 270 Days',
            accessor: row => getValue(row, '180-270'),
            align: 'right'
          },
          {
            Header: 'Prior 271 to 360 Days',
            accessor: row => getValue(row, '271-365'),
            align: 'right'
          }
        ]
      }
    ])
    setData(tableData)
  }, [props])

  return (
    <Table columns={columns} data={data} fetchData={fetchData} width={600} />
  )
}
