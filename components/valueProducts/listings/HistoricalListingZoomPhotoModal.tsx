import React from 'react'
import Modal from 'components/common/Modal'

interface Props {
  closeModal: () => void
  photo: string
}

export default function HistoricalListingZoomPhotoModal({
  closeModal,
  photo
}: Props) {
  return (
    <Modal closeModal={closeModal} title={''} percent={75} id="zoom-photo" dark>
      <img className="photo" src={photo} alt="photo" />
    </Modal>
  )
}
