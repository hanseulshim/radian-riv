import React, { useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import VideoTutorialModal from 'components/valueProducts/VideoTutorialModal'
import Sidebar from 'components/Sidebar'
import Link from 'next/link'

function ValueProducts() {
  const [videoModal, setVideoModal] = useState(false)
  const toggleVideoModal = () => {
    setVideoModal(!videoModal)
  }
  return (
    <Sidebar routes={[]} label="Value Products" parentPath="/">
      <div className="container">
        <Breadcrumbs current="Value Products" />
        <h1>Value Products</h1>
        <Link href="/value-products/31130765-5">
          <a>18324 Tapwood Road</a>
        </Link>
        <div style={{ marginTop: '1em' }}>
          <button onClick={toggleVideoModal} className="btn">
            Video Tutorials
          </button>
        </div>
      </div>
      {videoModal && <VideoTutorialModal closeModal={toggleVideoModal} />}
    </Sidebar>
  )
}

export default withAuth(ValueProducts)
