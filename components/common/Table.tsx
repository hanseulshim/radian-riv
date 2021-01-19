import { useEffect } from 'react'
import { useSortBy, useTable } from 'react-table'

export default function Table({ columns, data, fetchData, getColWidth }) {
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
