import React, { useState, useCallback } from 'react'
import { useOrder } from 'context/OrderProvider'
import Table from 'components/common/Table'
import { formatPrice } from 'utils'

interface Props {
  views: string[]
  currentView: string
  setCurrentView: React.Dispatch<React.SetStateAction<string>>
}

export default function PropertyInfoTable({
  views,
  currentView,
  setCurrentView
}: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const { order } = useOrder()

  const fetchData = useCallback(async () => {
    const tableData = [
      {
        ...order
      }
    ]
    setColumns([
      {
        Header: 'Pool Name',
        accessor: 'poolName',
        width: 120
      },
      {
        Header: 'Loan Number',
        accessor: 'loanNumber',
        width: 125
      },
      {
        Header: 'ID',
        accessor: 'id',
        width: 125
      },
      {
        Header: 'Subject',
        accessor: row => {
          return `${row['address']}, ${row['city']}, ${row['state']}`
        },
        width: 150
      },
      {
        Header: 'Zip',
        accessor: 'zip',
        width: 95
      },
      {
        Header: 'Radian Interactive Value Date',
        accessor: 'rivDate',
        width: 180
      },
      {
        Header: 'Calculated Price',
        accessor: row => {
          return formatPrice(row.calculatedPrice)
        },
        width: 100
      },
      {
        Header: 'As of Date',
        accessor: 'asOfDate',
        width: 125
      }
    ])
    setData(tableData)
  }, [order])

  return (
    <div className="property-tabs">
      <Table columns={columns} data={data} fetchData={fetchData} />
      <ul className="tab-container">
        {views.map(view => (
          <li
            key={view}
            onClick={() => setCurrentView(view)}
            className={`${view === currentView ? 'active ' : ''}`}
          >
            {view}
          </li>
        ))}
      </ul>
    </div>
  )
}
