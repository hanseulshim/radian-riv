import React, { useEffect, useState } from 'react'
import { useValueProduct } from 'context/ValueProductProvider'
import DaysTable from './table/DaysTable'
import SoldDaysTable from './table/SoldDaysTable'
import ListPriceTable from './table/ListPriceTable'
import {
  getMarketAnalysisDays,
  getMarketAnalysisListings,
  MarketListings,
  getMarketAnalysisSoldDays
} from 'api'

export default function MarketAnalysis() {
  const [daysTable, setDaysTable] = useState([])
  const [soldDaysTable, setSoldDaysTable] = useState([])
  const [marketListings, setMarketListings] = useState<MarketListings>({
    activeListings: null,
    pendings: null,
    finalListPrice: {
      '0-90': null,
      '91-180': null,
      '180-270': null,
      '271-365': null
    },
    originalListPrice: {
      '0-90': null,
      '91-180': null,
      '180-270': null,
      '271-365': null
    }
  })
  const { propertyInfo } = useValueProduct()

  useEffect(() => {
    if (propertyInfo.id) {
      const getData = async () => {
        const days = await getMarketAnalysisDays(propertyInfo.id)
        setDaysTable(days)
        const soldDays = await getMarketAnalysisSoldDays(propertyInfo.id)
        setSoldDaysTable(soldDays)
        const listings = await getMarketAnalysisListings(propertyInfo.id)
        setMarketListings(listings)
      }
      getData()
    }
  }, [propertyInfo])

  return (
    <>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Subject SQFT:</span>
          <span>{propertyInfo.sqft !== null ? propertyInfo.sqft : '--'}</span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Subject Year Built:</span>
          <span>
            {propertyInfo.yearBuilt !== null ? propertyInfo.yearBuilt : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Prop Type:</span>
          <span>
            {propertyInfo.propertyType !== null
              ? propertyInfo.propertyType
              : '--'}
          </span>
        </div>
      </div>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Area:</span>
          <span>{propertyInfo.area !== null ? propertyInfo.area : '--'}</span>
        </div>
        <div className="analytics">
          <span className="label">Area Parameter:</span>
          <span>
            {propertyInfo.areaParameter !== null
              ? propertyInfo.areaParameter
              : '--'}
          </span>
        </div>
      </div>
      <DaysTable tableData={daysTable} />
      <SoldDaysTable tableData={soldDaysTable} />
      <div className="analytics-container">
        <div className="analytics" style={{ marginRight: '1em' }}>
          <span className="label">Current Active Listings:</span>
          <span>
            {marketListings.activeListings !== null
              ? marketListings.activeListings
              : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Current Pendings:</span>
          <span>
            {marketListings.pendings !== null ? marketListings.pendings : '--'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <ListPriceTable
          listingPrice={marketListings.finalListPrice}
          type="FINAL"
        />
        <ListPriceTable
          listingPrice={marketListings.originalListPrice}
          type="ORIGINAL"
        />
      </div>
    </>
  )
}
