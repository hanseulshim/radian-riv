import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import Radio from 'components/common/Radio'

interface Props {
  tableData: any[]
  setSelectedSource: (source: string) => void
  selectedSource: string
}

export default function SourceTable({
  tableData,
  setSelectedSource,
  selectedSource
}: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const width = 85
    setColumns([
      {
        Header: ' ',
        width: 50,
        align: 'center',
        accessor: 'input'
      },
      {
        Header: 'SELECT SOURCE ',
        width: 250,
        align: 'left',
        accessor: 'source'
      },
      {
        Header: 'Bed',
        width,
        align: 'left',
        accessor: 'bed'
      },
      {
        Header: 'Bath',
        width,
        align: 'left',
        accessor: 'bath'
      },
      {
        Header: 'SqFt',
        width,
        align: 'left',
        accessor: 'sqft'
      },
      {
        Header: 'Units',
        width,
        align: 'left',
        accessor: 'units'
      },
      {
        Header: 'Garage',
        width,
        align: 'left',
        accessor: 'garage'
      },
      {
        Header: 'Lot Size',
        width,
        align: 'left',
        accessor: 'lotSize'
      },
      {
        Header: 'Yr. Built',
        width,
        align: 'left',
        accessor: 'yearBuilt'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <Table
      columns={columns}
      data={data.map(row => {
        return {
          input: (
            <Radio
              onChange={e => setSelectedSource(e.target.value)}
              value={row.source}
              checked={selectedSource === row.source}
              label={''}
            />
          ),
          ...row
        }
      })}
      fetchData={fetchData}
      width={1000}
    />
  )
}
