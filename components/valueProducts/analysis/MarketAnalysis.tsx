import React, { useEffect, useState } from 'react'
import { useOrder } from 'context/OrderProvider'
import DaysTable from './table/DaysTable'
import SoldDaysTable from './table/SoldDaysTable'
import ListPriceTable from './table/ListPriceTable'
import {
  getMarketAnalysisDays,
  getMarketAnalysisListings,
  MarketListings,
  getMarketAnalysisSoldDays,
  MarketAnalysisInterface,
  getMarketAnalysis
} from 'api'

export default function MarketAnalysis() {
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysisInterface>(
    {
      sqft: null,
      year: null,
      propertyType: null,
      area: null,
      areaParameter: null
    }
  )
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
  const { order } = useOrder()

  useEffect(() => {
    if (order.id) {
      const getData = async () => {
        const days = await getMarketAnalysisDays(order.id)
        setDaysTable(days)
        const soldDays = await getMarketAnalysisSoldDays(order.id)
        setSoldDaysTable(soldDays)
        const listings = await getMarketAnalysisListings(order.id)
        setMarketListings(listings)
        const market = await getMarketAnalysis(order.id)
        setMarketAnalysis(market)
      }
      getData()
    }
  }, [order])

  return (
    <>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Subject SQFT:</span>
          <span>
            {marketAnalysis.sqft !== null ? marketAnalysis.sqft : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Subject Year Built:</span>
          <span>
            {marketAnalysis.year !== null ? marketAnalysis.year : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Prop Type:</span>
          <span>
            {marketAnalysis.propertyType !== null
              ? marketAnalysis.propertyType
              : '--'}
          </span>
        </div>
      </div>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Area:</span>
          <span>
            {marketAnalysis.area !== null ? marketAnalysis.area : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Area Parameter:</span>
          <span>
            {marketAnalysis.areaParameter !== null
              ? marketAnalysis.areaParameter
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
          listPrice={marketListings.finalListPrice}
          type="FINAL"
        />
        <ListPriceTable
          listPrice={marketListings.originalListPrice}
          type="ORIGINAL"
        />
      </div>
    </>
  )
}
