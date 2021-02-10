import React, { useEffect, useState } from 'react'
import Modal from 'components/common/Modal'
import HistoricalListingTable from './HistoricalListingTable'
import HistoricalListingZoomPhotoModal from './HistoricalListingZoomPhotoModal'
import GalleryModal from './GalleryModal'
import ListingHistoryTable from './ListingHistoryTable'
import { getListingHistory, PropertyInterface } from 'api'

interface Props {
  closeModal: () => void
  property: PropertyInterface
  type: string
}

export default function HistoricalListingModal({
  closeModal,
  property,
  type
}: Props) {
  const [galleryModal, setGalleryModal] = useState(false)
  const [zoomPhoto, setZoomPhoto] = useState(false)
  const [listingHistory, setListingHistory] = useState<PropertyInterface[]>([])
  const listingPhoto =
    property.photos && property.photos.length ? property.photos[0] : null

  useEffect(() => {
    const listingHistory = async () => {
      const history = await getListingHistory(property.id)
      setListingHistory(history)
    }
    listingHistory()
  }, [])

  return (
    <Modal
      closeModal={closeModal}
      title={''}
      percent={95}
      id="historical-listing-modal"
    >
      <div className="top-row">
        <h2>
          {type} #{property.order}
        </h2>
        <button onClick={() => window.print()} className="btn btn-icon dark">
          <span>Print</span>
          <span className="icon-container">
            <img src={`${process.env.baseUrl}/images/print.svg`} alt="print" />
          </span>
        </button>
      </div>
      <div className="listing-info">
        <div className="listing-image">
          <div className="image-container">
            {listingPhoto ? (
              <img className="image" src={property.photos[0]} alt="property" />
            ) : (
              <img
                className="image"
                src={`${process.env.baseUrl}/images/photo-unavailable.svg`}
                alt="unavilable"
              />
            )}
            <div className="overlay" onClick={() => setZoomPhoto(true)}>
              <img
                src={`${process.env.baseUrl}/images/search.svg`}
                alt="print"
              />
            </div>
          </div>
          <button
            onClick={() => setGalleryModal(true)}
            className="btn btn-small"
          >
            View All Photos
          </button>
        </div>
        <div>
          <HistoricalListingTable tableData={[property]} />
          <div className="info-container">
            <div style={{ flex: 0.5, marginRight: '1em' }}>
              <div className="label">Address:</div>
              <div>{property.address}</div>
              <div>{property.zip}</div>
              <div className="label space">Listing Date:</div>
              <div>{property.listingDate}</div>
              <div className="label space">MLS Name:</div>
              <div>{property.mlsName}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="label">MLS Comments:</div>
              <div>{property.mlsComments}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="listing-history">
        <h2>Listing History</h2>
        <ListingHistoryTable
          tableData={listingHistory}
          setListingHistory={setListingHistory}
        />
      </div>
      {galleryModal && (
        <GalleryModal
          photos={property.photos}
          closeModal={() => {
            setGalleryModal(false)
          }}
        />
      )}
      {zoomPhoto && (
        <HistoricalListingZoomPhotoModal
          photo={listingPhoto}
          closeModal={() => {
            setZoomPhoto(false)
          }}
        />
      )}
    </Modal>
  )
}
