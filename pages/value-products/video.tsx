import React, { useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import { valueProductRoutes } from 'utils'
import VideoTutorialModal from 'components/valueProducts/VideoTutorialModal'

function Video() {
  const [videoModal, setVideoModal] = useState(false)
  const toggleVideoModal = () => {
    setVideoModal(!videoModal)
  }
  return (
    <div id="main">
      <div className="content value-products">
        <Breadcrumbs
          routes={valueProductRoutes}
          parents={[{ path: '/value-products', name: 'Value Products' }]}
          label="Video"
          current="Video"
          parentPath="/value-products"
        />
        <button onClick={toggleVideoModal} className="btn">
          Video Tutorials
        </button>
        {videoModal && <VideoTutorialModal closeModal={toggleVideoModal} />}
      </div>
    </div>
  )
}

export default withAuth(Video)
