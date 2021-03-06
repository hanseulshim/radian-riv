import React, { useEffect, useState } from 'react'
import { useOrder } from 'context/OrderProvider'
import DaysTable from './table/DaysTable'
import SoldDaysTable from './table/SoldDaysTable'
import ListPriceTable from './table/ListPriceTable'
import DepressedMarketGrid from './table/DepressedMarketGridTable'
import {
  getFilteredMarketAnalysisData,
  IMarketListings,
  IFilteredMarketAnalysisFilters
} from 'api'

export default function FilteredMarketAnalysis() {
  const [
    marketFilters,
    setMarketFilters
  ] = useState<IFilteredMarketAnalysisFilters>({
    minSqft: null,
    maxSqft: null,
    minYear: null,
    maxYear: null,
    propTypeValue: null,
    minBed: null,
    maxBed: null,
    compTypeValue: null,
    sqft: null,
    yrBuilt: null,
    area: null,
    areaParameter: null
  })
  const [daysTable, setDaysTable] = useState([])
  const [soldDaysTable, setSoldDaysTable] = useState([])
  const [depressedMarketTable, setDepressedMarketTable] = useState([])
  const [marketListings, setMarketListings] = useState<IMarketListings>({
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
    if (order.ordersId) {
      const getData = async () => {
        const data = await getFilteredMarketAnalysisData(order.ordersId)
        setMarketFilters(data.subjectProperty)
        setDaysTable(data.daysData)
        setSoldDaysTable(data.soldDaysData)
        setDepressedMarketTable(data.depressedMarket)
        setMarketListings(data.marketListings)
      }
      getData()
    }
  }, [order])

  return (
    <>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Subject SQFT:</span>
          <span>{marketFilters.sqft !== null ? marketFilters.sqft : '--'}</span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Subject Year Built:</span>
          <span>
            {marketFilters.yrBuilt !== null ? marketFilters.yrBuilt : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Prop Type:</span>
          <span>
            {marketFilters.propTypeValue !== null
              ? marketFilters.propTypeValue
              : '--'}
          </span>
        </div>
      </div>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Area:</span>
          <span>{marketFilters.area !== null ? marketFilters.area : '--'}</span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Area Parameter:</span>
          <span>
            {marketFilters.areaParameter !== null
              ? marketFilters.areaParameter
              : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 170 }}>
          <span className="label">Min Sqft:</span>
          <span>
            {marketFilters.minSqft !== null ? marketFilters.minSqft : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 170 }}>
          <span className="label">Min YrBlt:</span>
          <span>
            {marketFilters.minYear !== null ? marketFilters.minYear : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Property Type:</span>
          <span>
            {marketFilters.propTypeValue !== null
              ? marketFilters.propTypeValue
              : '--'}
          </span>
        </div>
      </div>
      <div className="analytics-container">
        <div className="analytics" style={{ width: 210 }}>
          <span className="label">Min Bed:</span>
          <span>
            {marketFilters.minBed !== null ? marketFilters.minBed : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 245 }}>
          <span className="label">Max Bed:</span>
          <span>
            {marketFilters.maxBed !== null ? marketFilters.maxBed : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 170 }}>
          <span className="label">Max Sqft:</span>
          <span>
            {marketFilters.maxSqft !== null ? marketFilters.maxSqft : '--'}
          </span>
        </div>
        <div className="analytics" style={{ width: 170 }}>
          <span className="label">Max YrBlt:</span>
          <span>
            {marketFilters.maxYear !== null ? marketFilters.maxYear : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Comparable Type:</span>
          <span>
            {marketFilters.compTypeValue !== null
              ? marketFilters.compTypeValue
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
      <div style={{ display: 'flex', marginBottom: '1em' }}>
        <ListPriceTable
          listPrice={marketListings.finalListPrice}
          type="FINAL"
        />
        <ListPriceTable
          listPrice={marketListings.originalListPrice}
          type="ORIGINAL"
        />
      </div>
      <h2>Depressed Market Grid</h2>
      <DepressedMarketGrid tableData={depressedMarketTable} />
    </>
  )
}
