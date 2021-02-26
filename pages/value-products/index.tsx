import React, { useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { valueProductRoutes } from 'utils'
import NewOrder from 'components/valueProducts/NewOrder'
import SearchOrders from 'components/valueProducts/search-orders'

function ValueProducts() {
  const [currentView, setCurrentView] = useState('New Order')
  const views = ['New Order', 'Search Orders']
  return (
    <Sidebar routes={valueProductRoutes} label="Value Products" parentPath="/">
      <div className="container value-products">
        <Breadcrumbs current="Value Products" />
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
    </Sidebar>
  )
}

export default withAuth(ValueProducts)
