import React, { useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import { valueProductRoutes } from 'utils'
import NewOrder from 'components/valueProducts/new-orders'
import SearchOrders from 'components/valueProducts/search-orders'

function ValueProducts() {
  const [currentView, setCurrentView] = useState('New Order')
  const views = ['New Order', 'Search Orders']
  return (
    <div id="main">
      <div className="content value-products">
        <Breadcrumbs
          routes={valueProductRoutes}
          label="Value Products"
          current="Value Products"
          parentPath="/"
        />
        <h1>Orders</h1>
        <ul style={{ marginTop: '1em' }} className="tab-container">
          {views.map(view => (
            <li
              key={view}
              onClick={() => setCurrentView(view)}
              className={`${view === currentView ? 'active ' : ''}`}
            >
              {view}
            </li>
          ))}
        </ul>
        {currentView === 'New Order' ? <NewOrder /> : <SearchOrders />}
      </div>
    </div>
  )
}

export default withAuth(ValueProducts)
