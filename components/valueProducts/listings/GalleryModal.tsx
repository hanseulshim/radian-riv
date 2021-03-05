import React from 'react'
import Modal from 'components/common/Modal'
interface Props {
  closeModal: () => void
  photos: string[]
}

export default function GalleryModal({ closeModal, photos }: Props) {
  return (
    <Modal closeModal={closeModal} title={''} percent={90} id="gallery-modal">
      <div className="gallery-container">
        {photos.map(photo => (
          <div key={photo} className="gallery-wrapper">
            <img className="photo" src={photo} alt="property" />
          </div>
        ))}
      </div>
    </Modal>
  )
}
