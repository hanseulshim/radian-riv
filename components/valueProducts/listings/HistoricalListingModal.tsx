import React, { useEffect, useState } from 'react'
import Modal from 'components/common/Modal'
import HistoricalListingTable from './HistoricalListingTable'
import HistoricalListingZoomPhotoModal from './HistoricalListingZoomPhotoModal'
import GalleryModal from './GalleryModal'
import ListingHistoryTable from './ListingHistoryTable'
import {
  getHistoricalListingHistory,
  getHistoricalListingProperty,
  HistoricalListingPropertyInterface,
  HistoricalListingInterface
} from 'api'
import { useOrder } from 'context/OrderProvider'

interface Props {
  closeModal: () => void
  propertyId: string
  title: string
}

export default function HistoricalListingModal({
  closeModal,
  propertyId,
  title
}: Props) {
  const { order } = useOrder()
  const [galleryModal, setGalleryModal] = useState(false)
  const [zoomPhoto, setZoomPhoto] = useState(false)
  const [
    currentProperty,
    setCurrentProperty
  ] = useState<HistoricalListingPropertyInterface>({
    address: null,
    bath: null,
    bed: null,
    garage: null,
    listDate: null,
    lotSize: null,
    mlsComments: null,
    mlsName: null,
    saleType: null,
    sqft: null,
    year: null,
    zip: null,
    photos: []
  })
  const [listingHistory, setListingHistory] = useState<
    HistoricalListingInterface[]
  >([])

  useEffect(() => {
    const getCurrentProperty = async () => {
      const property = await getHistoricalListingProperty(propertyId, order.id)
      setCurrentProperty(property)
    }
    getCurrentProperty()
    const listingHistory = async () => {
      const history = await getHistoricalListingHistory(propertyId, order.id)
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
        <h2>{title}</h2>
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
            {currentProperty && currentProperty.photos[0] ? (
              <img
                className="image"
                src={currentProperty.photos[0]}
                alt="property"
              />
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
          {currentProperty && (
            <HistoricalListingTable tableData={[currentProperty]} />
          )}
          <div className="info-container">
            <div style={{ flex: 0.5, marginRight: '1em' }}>
              <div className="label">Address:</div>
              <div>{currentProperty?.address || null}</div>
              <div>{currentProperty?.zip || null}</div>
              <div className="label space">Listing Date:</div>
              <div>{currentProperty?.listDate || null}</div>
              <div className="label space">MLS Name:</div>
              <div>{currentProperty?.mlsName || null}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="label">MLS Comments:</div>
              <div>{currentProperty?.mlsComments || null}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="listing-history">
        <h2>Listing History</h2>
        {listingHistory && (
          <ListingHistoryTable
            tableData={listingHistory}
            setListingHistory={setListingHistory}
          />
        )}
      </div>
      {galleryModal && (
        <GalleryModal
          photos={currentProperty.photos}
          closeModal={() => {
            setGalleryModal(false)
          }}
        />
      )}
      {zoomPhoto && (
        <HistoricalListingZoomPhotoModal
          photo={currentProperty.photos[0]}
          closeModal={() => {
            setZoomPhoto(false)
          }}
        />
      )}
    </Modal>
  )
}
