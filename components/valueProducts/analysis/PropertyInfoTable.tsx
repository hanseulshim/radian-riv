import React, { useState, useCallback } from 'react'
import { useValueProduct } from 'context/ValueProductProvider'
import Table from 'components/common/Table'

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
  const { propertyInfo } = useValueProduct()

  const fetchData = useCallback(async () => {
    const tableData = [
      {
        ...propertyInfo
      }
    ]
    setColumns([
      {
        Header: 'Pool Name',
        accessor: 'poolName'
      },
      {
        Header: 'Loan Number',
        accessor: 'loanNumber'
      },
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Subject',
        accessor: row => {
          return `${row['address']}, ${row['city']}, ${row['state']}`
        }
      },
      {
        Header: 'Zip',
        accessor: 'zip'
      },
      {
        Header: 'Radian Interactive Value Date',
        accessor: 'rivDate'
      },
      {
        Header: 'Calculated Price',
        accessor: 'calculatedPrice'
      },
      {
        Header: 'As of Date',
        accessor: 'asOfDate'
      }
    ])
    setData(tableData)
  }, [propertyInfo])

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
