import React, { useState, useCallback, useEffect } from 'react'
import { PropertyInterface } from 'api'
import { formatPrice } from 'utils'
import Checkbox from 'components/common/Checkbox'
import Table from 'components/common/Table'
import PhotoPlay from './PhotoPlay'
import MlsSheetModal from './MlsSheetModal'

interface Props {
  tableData: PropertyInterface[]
  setListingHistory: React.Dispatch<React.SetStateAction<PropertyInterface[]>>
}

export default function ListingHistoryTable({
  tableData,
  setListingHistory
}: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedProperties, setSelectedProperties] = useState<
    PropertyInterface[]
  >([])
  const [mlsNumber, setMlsNumber] = useState<string>(null)

  const showMlsProperties = tableData.filter(property => property.showMls)
    .length
  const exportMlsProperties = tableData.filter(
    property => property.showMls && property.exportMls
  ).length

  const toggleSelect = (id: string) => {
    const selectedArr = selectedProperties.slice()
    if (id === 'all') {
      if (showMlsProperties === selectedProperties.length) {
        setSelectedProperties([])
      } else {
        setSelectedProperties(tableData.filter(property => property.showMls))
      }
    } else {
      const index = selectedArr.findIndex(property => property.id === id)
      const property = tableData.find(property => property.id === id)
      if (index > -1) {
        selectedArr.splice(index, 1)
      } else {
        selectedArr.push(property)
      }
      setSelectedProperties(selectedArr)
    }
  }

  const toggleExportMls = (id: string) => {
    const arr = tableData.slice().map(property => ({
      ...property,
      selected: !!selectedProperties.find(prop => prop.id === property.id)
    }))
    if (id === 'all') {
      arr.forEach(property => {
        if (property.showMls) {
          property.exportMls = !(showMlsProperties === exportMlsProperties)
        }
      })
    } else {
      const property = arr.find(property => property.id === id)
      property.exportMls = !property.exportMls
    }
    setListingHistory(arr)
  }

  const fetchData = useCallback(async () => {
    setColumns([
      {
        id: 'select',
        Header: () => (
          <div className="checkbox-header">
            <span className="header-label">+/-</span>
            <Checkbox
              label=""
              checked={showMlsProperties === selectedProperties.length}
              onChange={() => toggleSelect('all')}
              small
            />
          </div>
        ),
        accessor: row =>
          row.showMls && (
            <Checkbox
              label=""
              checked={row.selected}
              onChange={() => toggleSelect(row.id)}
              small
            />
          ),
        align: 'center',
        width: 70
      },
      {
        Header: 'MLS Sheet',
        accessor: (row: PropertyInterface) =>
          row.showMls && (
            <button
              style={{ width: 80, minWidth: 80 }}
              className="btn btn-small"
              onClick={() => setMlsNumber(row.listingNumber)}
            >
              View
            </button>
          ),
        align: 'center',
        width: 75
      },
      {
        id: 'export',
        Header: () => (
          <div className="checkbox-header">
            <span className="header-label">Export MLS</span>
            <Checkbox
              label=""
              checked={showMlsProperties === exportMlsProperties}
              onChange={() => toggleExportMls('all')}
              small
            />
          </div>
        ),
        accessor: (row: PropertyInterface) =>
          row.showMls && (
            <Checkbox
              label=""
              checked={row.exportMls}
              onChange={() => toggleExportMls(row.id)}
              small
            />
          ),
        align: 'center',
        width: 110
      },
      {
        Header: 'MLS Name',
        accessor: 'mlsName',
        width: 130
      },
      {
        Header: 'Listing Number',
        accessor: 'listingNumber'
      },
      {
        Header: 'List Date',
        accessor: 'listingDate',
        width: 110
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 110
      },
      {
        Header: 'List Price',
        accessor: (row: PropertyInterface) => formatPrice(row.listingPrice),
        width: 120
      },
      {
        Header: 'Chg Date',
        accessor: 'changeDate',
        width: 110
      },
      {
        Header: 'COE Date',
        accessor: 'coeDate',
        width: 110
      },
      {
        Header: 'Sold Price',
        accessor: (row: PropertyInterface) => formatPrice(row.soldPrice),
        width: 120
      },
      {
        Header: 'Sale Type',
        accessor: 'saleType',
        width: 90
      },
      {
        Header: 'Cumulative List Days',
        accessor: 'cumulativeListDays',
        align: 'right',
        width: 125
      }
    ])
    setData(
      tableData.map(property => ({
        ...property,
        selected: !!selectedProperties.find(prop => prop.id === property.id)
      }))
    )
  }, [tableData, selectedProperties])

  return (
    <div className="listing-history-table">
      <Table columns={columns} data={data} fetchData={fetchData} />
      <div className="property-display-container">
        {selectedProperties.map(property => (
          <div className="property-display">
            <PhotoPlay photos={property.photos} />
            <div className="info-container">
              <div className="label">COE Date:</div>
              <div>{property.coeDate}</div>
              <div className="label">Sold Price:</div>
              <div>{formatPrice(property.soldPrice)}</div>
              <div className="label">Sale Type:</div>
              <div>{property.saleType}</div>
              <div className="label">MLS Name:</div>
              <div>{property.mlsName}</div>
            </div>
            <div className="info-container">
              <div className="label">MLS Comments:</div>
              <div>{property.mlsComments}</div>
            </div>
          </div>
        ))}
      </div>
      {mlsNumber && (
        <MlsSheetModal
          closeModal={() => setMlsNumber(null)}
          mlsNumber={mlsNumber}
        />
      )}
    </div>
  )
}