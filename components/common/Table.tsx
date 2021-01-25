import React, { useEffect } from 'react'
import { useSortBy, useTable, useFlexLayout } from 'react-table'

export default function Table({ columns, data, fetchData, sortTable = false }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
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
    useSortBy,
    useFlexLayout
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const headerProps = (props, { column }) =>
    getStyles(props, column.align, column)

  const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

  const getStyles = (props, align = 'left', column?) => {
    if (!column || !sortTable) {
      return [
        props,
        {
          style: {
            justifyContent: align === 'right' ? 'flex-end' : 'flex-start'
          }
        }
      ]
    }
    const colProps = column.getSortByToggleProps()
    return [
      props,
      {
        ...colProps,
        style: {
          ...colProps.style,
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start'
        }
      }
    ]
  }

  return (
    <div className="table-container">
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div
              {...headerGroup.getHeaderGroupProps({
                style: { paddingRight: '15px' }
              })}
              className="tr"
            >
              {headerGroup.headers.map(column => {
                return (
                  <div className="th" {...column.getHeaderProps(headerProps)}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ' '}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="tbody">
          {rows.map(row => {
            prepareRow(row)
            return (
              <div {...row.getRowProps()} className="tr styled-table-row">
                {row.cells.map(cell => (
                  <div {...cell.getCellProps(cellProps)} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
