import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import Link from 'next/link'
import { formatPrice } from 'utils'

interface Props {
  tableData: any[]
}

export default function OrdersTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const fetchData = useCallback(async () => {
    setColumns([
      {
        Header: 'Order ID',
        accessor: row => (
          <Link href={`/value-products/${row.orderId}`}>
            <a className="link">{row.orderId}</a>
          </Link>
        ),
        align: 'right',
        width: 150
      },
      {
        Header: 'Product Type',
        accessor: 'productType',
        width: 125
      },
      {
        Header: 'Street Address',
        accessor: 'address'
      },
      {
        Header: 'City',
        accessor: 'city',
        width: 175
      },
      {
        Header: 'State',
        accessor: 'state',
        width: 50
      },
      {
        Header: 'Zip',
        accessor: 'zip',
        width: 125
      },
      {
        Header: 'Reconcile Status',
        accessor: 'reconcileStatus',
        width: 150
      },
      {
        Header: 'Client',
        accessor: 'client',
        width: 150
      },
      {
        Header: 'Ordered By',
        accessor: 'orderedBy',
        width: 150
      },
      {
        Header: 'Order Date',
        accessor: 'orderDate',
        width: 130
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        width: 130
      },
      {
        Header: 'Price',
        accessor: row => formatPrice(row.price),
        width: 100
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div style={{ marginTop: '2em', maxWidth: '1020px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ marginBottom: '0.5em' }}>Orders</h2>
        <span>{tableData.length} Orders</span>
      </div>
      <Table columns={columns} data={data} fetchData={fetchData} />
    </div>
  )
}
