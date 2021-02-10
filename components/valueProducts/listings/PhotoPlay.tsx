import React, { useState, useEffect } from 'react'
import GalleryModal from 'components/valueProducts/listings/GalleryModal'

interface Props {
  photos: string[]
}

export default function PhotoPlay({ photos }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [playMode, setPlayMode] = useState(false)
  const [galleryModal, setGalleryModal] = useState(false)

  const toggleGalleryModal = () => {
    setGalleryModal(!galleryModal)
  }

  const photoLength = photos ? photos.length : 0

  useEffect(() => {
    if (playMode) {
      setTimeout(() => {
        if (photoIndex + 1 === photoLength) {
          setPhotoIndex(0)
        } else {
          setPhotoIndex(photoIndex + 1)
        }
      }, 2000)
    }
  }, [playMode, photoIndex])
  const prevImage = () => {
    if (playMode) return
    if (photoIndex - 1 < 0) {
      setPhotoIndex(photoLength - 1)
    } else {
      setPhotoIndex(photoIndex - 1)
    }
  }
  const nextImage = () => {
    if (playMode) return
    if (photoIndex + 1 === photoLength) {
      setPhotoIndex(0)
    } else {
      setPhotoIndex(photoIndex + 1)
    }
  }

  return (
    <div className="play-photo-container">
      <div className="photo-wrapper">
        <img
          className="photo"
          src={
            photoLength
              ? photos[photoIndex]
              : `${process.env.baseUrl}/images/photo-unavailable.svg`
          }
          alt="property"
        />
      </div>
      <div className={`photo-button-row${photoLength ? '' : ' empty'}`}>
        {photoLength ? (
          <>
            <span className="photo-count">
              {photoIndex + 1} of {photoLength}
            </span>
            <div className="photo-controls">
              <img
                className="previous"
                src={`${process.env.baseUrl}/images/left.svg`}
                alt="left button"
                onClick={prevImage}
              />
              <img
                className="play-pause"
                src={`${process.env.baseUrl}/images/${
                  playMode ? 'pause' : 'play'
                }.svg`}
                alt="play/pause"
                onClick={() => setPlayMode(!playMode)}
              />
              <img
                className="right"
                src={`${process.env.baseUrl}/images/right.svg`}
                alt="right button"
                onClick={nextImage}
              />
            </div>
            <span className="all-photos" onClick={toggleGalleryModal}>
              <img
                src={`${process.env.baseUrl}/images/external.svg`}
                alt="external link"
              />
              <span>All Photos</span>
            </span>
          </>
        ) : (
          <>
            <span>1 of 1</span>
          </>
        )}
      </div>
      {galleryModal && (
        <GalleryModal closeModal={toggleGalleryModal} photos={photos} />
      )}
    </div>
  )
}
