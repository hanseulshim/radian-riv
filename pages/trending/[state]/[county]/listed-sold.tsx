import CountyLayout from 'components/layouts/CountyLayout'
import ListedChart from 'components/trending/listed-sold/ListedChart'
import OriginalListVsSoldChart from 'components/trending/listed-sold/OriginalListVsSoldChart'
import SoldChart from 'components/trending/listed-sold/SoldChart'
import { useState } from 'react'

export default function ListedSold() {
  const [currentView, setCurrentView] = useState('Listed')

  const views = ['Listed', 'Sold', 'Original List vs Final Sold']
  return (
    <CountyLayout label="Listed/Sold">
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
      {currentView === 'Listed' ? (
        <ListedChart />
      ) : currentView === 'Sold' ? (
        <SoldChart />
      ) : (
        <OriginalListVsSoldChart />
      )}
    </CountyLayout>
  )
}
