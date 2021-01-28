import React, { useState } from 'react'
import ValueProductLayout from 'components/layouts/ValueProductLayout'
import MarketAnalysis from 'components/valueProducts/analysis/MarketAnalysis'
import FilteredMarketAnalysis from 'components/valueProducts/analysis/FilteredMarketAnalysis'
import PropertyTabs from 'components/valueProducts/analysis/table/PropertyInfoTable'
import MedianSalePrice from 'components/valueProducts/analysis/MedianSalePrice'

export default function MarketAnalysisPage() {
  const [currentView, setCurrentView] = useState('Market Analysis')
  const views = [
    'Market Analysis',
    'Filtered Market Analysis',
    'Median Sale Price'
  ]
  return (
    <ValueProductLayout>
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
        ) : (
          <MedianSalePrice />
        )}
      </div>
    </ValueProductLayout>
  )
}
