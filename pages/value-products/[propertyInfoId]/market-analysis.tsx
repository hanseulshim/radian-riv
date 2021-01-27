import React, { useState } from 'react'
import ValueProductLayout from 'components/layouts/ValueProductLayout'
import MarketAnalysis from 'components/valueProducts/MarketAnalysis'
import PropertyTabs from 'components/valueProducts/analysis/PropertyInfoTable'

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
        {currentView === 'Market Analysis' && <MarketAnalysis />}
      </div>
    </ValueProductLayout>
  )
}
