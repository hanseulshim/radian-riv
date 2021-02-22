import React, { useState } from 'react'
import ValueProductPropertyLayout from 'components/layouts/ValueProductLayout'
import MarketAnalysis from 'components/valueProducts/analysis/MarketAnalysis'
import FilteredMarketAnalysis from 'components/valueProducts/analysis/FilteredMarketAnalysis'
import PropertyTabs from 'components/valueProducts/analysis/table/PropertyInfoTable'
import MedianSalePrice from 'components/valueProducts/analysis/MedianSalePrice'
import FlipAnalysis from 'components/valueProducts/analysis/FlipAnalysis'

export default function MarketAnalysisPage() {
  const [currentView, setCurrentView] = useState('Market Analysis')
  const views = [
    'Market Analysis',
    'Filtered Market Analysis',
    'Median Sale Price',
    'Flip Analysis'
  ]
  return (
    <ValueProductPropertyLayout>
      <div className="market-analysis">
        <h1>Market Analysis</h1>
        <PropertyTabs
          views={views}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        {currentView === 'Market Analysis' ? (
          <MarketAnalysis />
        ) : currentView === 'Filtered Market Analysis' ? (
          <FilteredMarketAnalysis />
        ) : currentView === 'Median Sale Price' ? (
          <MedianSalePrice />
        ) : (
          <FlipAnalysis />
        )}
      </div>
    </ValueProductPropertyLayout>
  )
}
