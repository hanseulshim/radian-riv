import ValueProductPropertyLayout from 'components/layouts/ValueProductLayout'
import AdditionalDocuments from 'components/valueProducts/AdditionalDocuments'
import React, { useState } from 'react'

interface Props {}

export default function Documents({}: Props) {
  const [uploadModal, setUploadModal] = useState(false)

  const toggleUploadModal = () => {
    setUploadModal(!uploadModal)
  }

  return (
    <ValueProductPropertyLayout>
      <button className="btn" onClick={toggleUploadModal}>
        Upload Documents
      </button>
      {uploadModal && <AdditionalDocuments closeModal={toggleUploadModal} />}
    </ValueProductPropertyLayout>
  )
}
