import { useState, useEffect, useCallback } from 'react'
import { useTrending } from 'context/TrendingProvider'
import Modal from 'components/common/Modal'
import { useSortBy, useTable } from 'react-table'
import { downloadChartData } from 'api'

interface Props {
  view: string
  range: string
  closeModal: () => void
}

function Table({ columns, data, fetchData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: {
        sortBy: [
          columns.map(one => {
            return {
              desc: true,
              id: one.accessor ? one.accessor : ''
            }
          })
        ]
      }
    },
    useSortBy
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getColWidth = (header: string) => ({
    minWidth: header === 'PERIOD' ? 200 : 175
  })

  return (
    <div className="table-container">
      <div className="table-wrap">
        <table {...getTableProps()} className="styled-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    className="styled-table-head"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      ...column.getHeaderProps.style,
                      ...getColWidth(column.Header)
                    }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ' '}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="styled-table-row">
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        ...cell.getCellProps.style,
                        ...getColWidth(cell.column.id)
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function DownloadData({ view, closeModal, range }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedType,
    selectedMsa
  } = useTrending()

  const fetchData = useCallback(async () => {
    const tableData = await downloadChartData({
      state: selectedState.value,
      county: selectedCounty?.value || null,
      zip: selectedZip?.value || null,
      type: selectedType?.value || null,
      msa: selectedMsa?.value || null,
      view,
      range
    })
    if (tableData.length) {
      const tableColumns = Object.keys(tableData[0]).map(key => ({
        id: key,
        Header: key,
        accessor: row => {
          if (key === 'PERIOD') {
            const date = new Date(row[key])
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
          }
          return row[key]
        },
        sortType: (a, b) => {
          if (key === 'PERIOD') {
            const firstDate = new Date(a.values[key])
            const secondDate = new Date(b.values[key])
            return secondDate > firstDate ? -1 : 1
          } else {
            return b.values[key] > a.values[key] ? -1 : 1
          }
        },
        sortDescFirst: true
      }))
      setColumns(tableColumns)
    }
    setData(tableData)
  }, [])

  return (
    <Modal title="" closeModal={closeModal} percent={80}>
      <button
        style={{ alignSelf: 'flex-end', marginBottom: '1em' }}
        className="btn btn-primary"
      >
        Export to Excel
      </button>
      <Table columns={columns} data={data} fetchData={fetchData} />
    </Modal>
  )
}
