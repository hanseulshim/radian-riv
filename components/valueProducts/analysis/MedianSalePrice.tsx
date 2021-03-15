import React, { useEffect, useState } from 'react'
import { useOrder } from 'context/OrderProvider'
import MedianSalePriceTable from './table/MedianSalePriceTable'
import { getMedianSalePrice, MedianSalePriceInterface } from 'api'

export default function MedianSalePrice() {
  const [data, setData] = useState<MedianSalePriceInterface>({
    oneMonth: [],
    twoMonths: [],
    threeMonths: []
  })
  const { order } = useOrder()

  useEffect(() => {
    if (order.ordersId) {
      const getData = async () => {
        const tableData = await getMedianSalePrice(order.ordersId)
        setData(tableData)
      }
      getData()
    }
  }, [order])

  return (
    <div className="median-sale-price">
      <MedianSalePriceTable
        tableData={data.oneMonth}
        month="one"
        label={'ONE MONTH'}
      />
      <MedianSalePriceTable
        tableData={data.twoMonths}
        month="two"
        label={'TWO MONTHS'}
      />
      <MedianSalePriceTable
        tableData={data.threeMonths}
        month="three"
        label={'THREE MONTHS'}
      />
    </div>
  )
}
