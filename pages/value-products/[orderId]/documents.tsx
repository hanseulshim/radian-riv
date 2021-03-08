import OrderLayout from 'components/layouts/OrderLayout'
import AdditionalDocuments from 'components/valueProducts/AdditionalDocuments'
import React, { useState } from 'react'

interface Props {}

export default function Documents({}: Props) {
  const [uploadModal, setUploadModal] = useState(false)

  const toggleUploadModal = () => {
    setUploadModal(!uploadModal)
  }

  return (
    <OrderLayout>
      <button className="btn" onClick={toggleUploadModal}>
        Upload Documents
      </button>
      {uploadModal && <AdditionalDocuments closeModal={toggleUploadModal} />}
    </OrderLayout>
  )
}
