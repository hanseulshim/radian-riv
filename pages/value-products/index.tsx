import React, { useState } from 'react'
import Link from 'next/link'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { valueProductRoutes } from 'utils'
import NewOrder from 'components/valueProducts/NewOrder'
import SearchOrders from 'components/valueProducts/search-orders'
import VideoTutorialModal from 'components/valueProducts/VideoTutorialModal'

function ValueProducts() {
  const [currentView, setCurrentView] = useState('New Order')
  const [videoModal, setVideoModal] = useState(false)
  const toggleVideoModal = () => {
    setVideoModal(!videoModal)
  }
  const views = ['New Order', 'Search Orders']
  return (
    <Sidebar routes={valueProductRoutes} label="Value Products" parentPath="/">
      <div className="container value-products">
        <Breadcrumbs current="Value Products" />
        <h1>Orders</h1>
        <div className="testing-extras">
          <Link href="/value-products/31130765-5">
            <a>18324 Tapwood Road</a>
          </Link>
          <button onClick={toggleVideoModal} className="btn">
            Video Tutorials
          </button>
          {videoModal && <VideoTutorialModal closeModal={toggleVideoModal} />}
        </div>
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
