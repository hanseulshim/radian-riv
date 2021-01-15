import { useState, useEffect, useMemo } from 'react'
import { useTrending } from 'context/trending/TrendingProvider'
import Modal from 'components/common/Modal'
import { useTable } from 'react-table'
import { downloadHomePriceData } from 'api'

interface Props {
  closeModal: () => void
}

function Table({ columns, data }) {
  const columns1 = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'PERIOD'
      },
      {
        Header: 'Last Name',
        accessor: 'PCT CHANGE 1 YEAR MED SOLD PRICE NATIONAL LEVEL'
      }
    ],
    []
  )

  // console.table(makeData())
  // console.table(data1)

  const data1 = useMemo(() => data, [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default function DownloadData({ closeModal }: Props) {
  const [data1, setData] = useState([])
  const [columns, setColumns] = useState([])
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedType,
    selectedMsa
  } = useTrending()

  useEffect(() => {
    const getData = async () => {
      const tableData = await downloadHomePriceData({
        state: selectedState.value,
        county: selectedCounty?.value || null,
        zip: selectedZip?.value || null,
        type: selectedType?.value || null,
        msa: selectedMsa?.value || null
      })
      if (tableData.length) {
        const tableColumns = Object.keys(tableData[0]).map((key, id) => {
          return {
            Header: key,
            accessor: key
          }
        })
        setColumns(tableColumns)
      }
      setData(tableData)
    }
    getData()
  }, [])

  // if (!data.length) {
  //   // Or return loader
  //   return null
  // }

  async function makeData() {
    const makeDataLevel = async () => {
      const tableData = await downloadHomePriceData({
        state: selectedState.value,
        county: selectedCounty?.value || null,
        zip: selectedZip?.value || null,
        type: selectedType?.value || null,
        msa: selectedMsa?.value || null
      })
      return tableData
    }

    return makeDataLevel()
  }

  // console.table(makeData())
  // console.table(data1)

  const data = useMemo(async () => await makeData(), [])

  return (
    <Modal title="" closeModal={closeModal} width={800}>
      <button
        style={{ alignSelf: 'flex-end', marginBottom: '1em' }}
        className="btn btn-primary"
      >
        Export to Excel
      </button>
      {data1.length > 0 && <Table columns={columns} data={data} />}
    </Modal>
  )
}
