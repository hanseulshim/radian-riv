import { useState, useCallback } from 'react'
import Modal from 'components/common/Modal'
import Table from 'components/common/Table'

interface Props {
  tableData: any[]
  closeModal: () => void
}

export default function DownloadData({ closeModal, tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    if (tableData.length) {
      const tableColumns = Object.keys(tableData[0]).map(key => ({
        id: key,
        Header: key,
        accessor: row => {
          if (key.toUpperCase() === 'PERIOD') {
            const date = new Date(row[key])
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
          }
          return row[key]
        },
        sortType: (a, b) => {
          if (key.toUpperCase() === 'PERIOD') {
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
        className="btn btn-small"
      >
        Export to Excel
      </button>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        sortTable={true}
      />
    </Modal>
  )
}
