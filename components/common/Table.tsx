import React, { useEffect, useState } from 'react'
import { useSortBy, useTable, useFlexLayout } from 'react-table'

interface Props {
  columns: any[]
  data: any[]
  fetchData: () => {}
  sortTable?: boolean
  lightMode?: boolean
  width?: number
}

export default function Table({
  columns,
  data,
  fetchData,
  sortTable = false,
  lightMode = false,
  width
}: Props) {
  const [tableData, setTableData] = useState([])
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
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
    setTableData(data.slice().reverse())
  }, [data])

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
            justifyContent:
              align === 'right'
                ? 'flex-end'
                : align === 'center'
                ? 'center'
                : 'flex-start',
            textAlign:
              align === 'right'
                ? 'right'
                : align === 'center'
                ? 'center'
                : 'left'
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
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
          textAlign: align === 'right' ? 'right' : 'left'
        }
      }
    ]
  }

  return (
    <div className="table-container" style={{ width }}>
      <div {...getTableProps()} className={`${lightMode ? 'light ' : ''}table`}>
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => {
                return (
                  <div
                    className={`th${
                      column.id.includes('placeholder') ? ' empty' : ''
                    }${column.columns ? ' header-group' : ''}`}
                    {...column.getHeaderProps(headerProps)}
                  >
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
                    {cell.value !== null ? cell.render('Cell') : '--'}
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
