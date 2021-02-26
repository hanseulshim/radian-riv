import React, { useState } from 'react'
import { withAuth } from 'context/auth/AuthRoute'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { valueProductRoutes } from 'utils'
import VideoTutorialModal from 'components/valueProducts/VideoTutorialModal'

function Video() {
  const [videoModal, setVideoModal] = useState(false)
  const toggleVideoModal = () => {
    setVideoModal(!videoModal)
  }
  return (
    <Sidebar routes={valueProductRoutes} label="Value Products" parentPath="/">
      <div className="container value-products">
        <Breadcrumbs
          current="Video"
          parents={[{ path: '/value-products', name: 'Value Products' }]}
        />
        <button onClick={toggleVideoModal} className="btn">
          Video Tutorials
        </button>
        {videoModal && <VideoTutorialModal closeModal={toggleVideoModal} />}
      </div>
    </Sidebar>
  )
}

export default withAuth(Video)
