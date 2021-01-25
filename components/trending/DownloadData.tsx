import { useState, useCallback } from 'react'
import { useTrending } from 'context/TrendingProvider'
import Modal from 'components/common/Modal'
import { downloadChartData } from 'api'
import Table from 'components/common/Table'

interface Props {
  view: string
  range: string
  closeModal: () => void
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
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        sortTable={true}
      />
    </Modal>
  )
}
