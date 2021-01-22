import React, { useState, useCallback } from 'react'
import Modal from 'components/common/Modal'
import { getAboutUs } from 'api'
import Table from 'components/common/Table'

interface Props {
  closeModal: () => void
}

export default function AboutUs({ closeModal }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    const tableData = await getAboutUs()
    if (tableData.length) {
      const tableColumns = Object.keys(tableData[0]).map(key => ({
        Header: key,
        accessor: key
      }))
      setColumns(tableColumns)
    }
    setData(tableData)
  }, [])

  const getColWidth = (header: string) => ({
    minWidth: 250
  })

  return (
    <Modal closeModal={closeModal} title={'About Us'} percent={80}>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        getColWidth={getColWidth}
      />
    </Modal>
  )
}
