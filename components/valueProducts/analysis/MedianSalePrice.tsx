import React, { useEffect, useState } from 'react'
import { useValueProduct } from 'context/ValueProductProvider'
import MedianSalePriceTable from './table/MedianSalePriceTable'
import { getMedianSalePrice, MedianSalePriceInterface } from 'api'

export default function MedianSalePrice() {
  const [data, setData] = useState<MedianSalePriceInterface>({
    oneMonth: [],
    twoMonths: [],
    threeMonths: []
  })
  const { propertyInfo } = useValueProduct()

  useEffect(() => {
    if (propertyInfo.id) {
      const getData = async () => {
        const tableData = await getMedianSalePrice(propertyInfo.id)
        setData(tableData)
      }
      getData()
    }
  }, [propertyInfo])

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
