import CountyLayout from 'components/layouts/CountyLayout'
import { useState } from 'react'
import SupplyChart from 'components/trending/dom-supply/SupplyChart'
import DomChart from 'components/trending/dom-supply/DomChart'

export default function DomSupply() {
  const [currentView, setCurrentView] = useState('Supply')

  const views = ['DOM', 'Supply']
  return (
    <CountyLayout label="DOM/Supply">
      <ul className="view-container">
        {views.map(view => (
          <li
            key={view}
            onClick={() => setCurrentView(view)}
            className={`${
              view === currentView ? 'active ' : ''
            }trending-view-tab`}
          >
            {view}
          </li>
        ))}
      </ul>
      {currentView === 'Supply' ? <SupplyChart /> : <DomChart />}
    </CountyLayout>
  )
}
