import React, { useEffect, useState } from 'react'
import { useValueProduct } from 'context/ValueProductProvider'
import DaysTable from './DaysTable'
import SoldDaysTable from './SoldDaysTable'
import FinalListPriceTable from './FinalListPriceTable'
import OriginalListPriceTable from './OriginalListPriceTable'
import DepressedMarketGrid from './DepressedMarketGrid'
import {
  getFilteredMarketAnalysisFilters,
  getFilteredMarketAnalysisDays,
  getFilteredMarketAnalysisListings,
  getFilteredMarketAnalysisSoldDays,
  MarketListings,
  FilteredMarketAnalysisFilters,
  getFilteredMarketAnalysisDepressedMarketGrid
} from 'api'

export default function FilteredMarketAnalysis() {
  const [
    marketFilters,
    setMarketFilters
  ] = useState<FilteredMarketAnalysisFilters>({
    minSqft: null,
    maxSqft: null,
    minYrBlt: null,
    maxYrBlt: null,
    propertyType: null,
    minBed: null,
    maxBed: null,
    comparableType: null
  })
  const [daysTable, setDaysTable] = useState([])
  const [soldDaysTable, setSoldDaysTable] = useState([])
  const [depressedMarketTable, setDepressedMarketTable] = useState([])
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
        const filters = await getFilteredMarketAnalysisFilters(propertyInfo.id)
        setMarketFilters(filters)
        const days = await getFilteredMarketAnalysisDays(propertyInfo.id)
        setDaysTable(days)
        const soldDays = await getFilteredMarketAnalysisSoldDays(
          propertyInfo.id
        )
        setSoldDaysTable(soldDays)
        const depressedMarket = await getFilteredMarketAnalysisDepressedMarketGrid(
          propertyInfo.id
        )
        setDepressedMarketTable(depressedMarket)
        const listings = await getFilteredMarketAnalysisListings(
          propertyInfo.id
        )
        setMarketListings(listings)
      }
      getData()
    }
  }, [propertyInfo])

  return (
    <>
      <div className="analytics-container">
        <div className="analytics">
          <span className="label">Subject SQFT:</span>
          <span>{propertyInfo.sqft !== null ? propertyInfo.sqft : '--'}</span>
        </div>
        <div className="analytics">
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
        <div className="analytics">
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
        <div className="analytics">
          <span className="label">Min Sqft:</span>
          <span>
            {marketFilters.minSqft !== null ? marketFilters.minSqft : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Min YrBlt:</span>
          <span>
            {marketFilters.minYrBlt !== null ? marketFilters.minYrBlt : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Property Type:</span>
          <span>
            {marketFilters.propertyType !== null
              ? marketFilters.propertyType
              : '--'}
          </span>
        </div>
      </div>
      <div className="analytics-container">
        <div className="analytics">
          <span className="label">Min Bed:</span>
          <span>
            {marketFilters.minBed !== null ? marketFilters.minBed : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Max Bed:</span>
          <span>
            {marketFilters.maxBed !== null ? marketFilters.maxBed : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Max Sqft:</span>
          <span>
            {marketFilters.maxSqft !== null ? marketFilters.maxSqft : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Max YrBlt:</span>
          <span>
            {marketFilters.maxYrBlt !== null ? marketFilters.maxYrBlt : '--'}
          </span>
        </div>
        <div className="analytics">
          <span className="label">Comparable Type:</span>
          <span>
            {marketFilters.comparableType !== null
              ? marketFilters.comparableType
              : '--'}
          </span>
        </div>
      </div>
      <DaysTable tableData={daysTable} />
      <SoldDaysTable tableData={soldDaysTable} />
      <div className="analytics-container">
        <div className="analytics">
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
        <FinalListPriceTable {...marketListings.finalListPrice} />
        <OriginalListPriceTable {...marketListings.originalListPrice} />
      </div>
      <h2>Depressed Market Grid</h2>
      <DepressedMarketGrid tableData={depressedMarketTable} />
    </>
  )
}
