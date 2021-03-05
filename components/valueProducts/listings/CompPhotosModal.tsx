import React, { useEffect, useState } from 'react'
import Modal from 'components/common/Modal'
import {
  CompPhotoPropertyInterface,
  getSoldCompProperties,
  getListedCompProperties,
  getContractCompProperties
} from 'api'
import CompPhoto from './CompPhoto'
import Checkbox from 'components/common/Checkbox'

interface Props {
  closeModal: () => void
  view: string
  orderId: string
}

export default function CompPhotosModal({ closeModal, view, orderId }: Props) {
  const [checkedProperties, setCheckedProperties] = useState([])
  const [properties, setProperties] = useState<CompPhotoPropertyInterface[]>([])
  useEffect(() => {
    const getCompProperties = async () => {
      if (view === 'Sold') {
        const props = await getSoldCompProperties(orderId)
        setProperties(props)
      } else if (view === 'Listed') {
        const props = await getListedCompProperties(orderId)
        setProperties(props)
      } else if (view === 'Under Contract') {
        const props = await getContractCompProperties(orderId)
        setProperties(props)
      }
    }
    getCompProperties()
  }, [])
  return (
    <Modal closeModal={closeModal} title={''} percent={90} id="comp-modal">
      <div className="comp-photos-modal">
        <div className="top-row">
          <button className="btn btn-small">Submit</button>
          <div className="check">
            <Checkbox
              label="Check/Uncheck All"
              checked={checkedProperties.length === properties.length}
              onChange={() => {
                if (!(checkedProperties.length === properties.length)) {
                  const listings = properties.map(
                    property => property.listingNumber
                  )
                  setCheckedProperties(listings)
                } else {
                  setCheckedProperties([])
                }
              }}
              leftLabel
            />
          </div>
        </div>
        <div className="comp-photo-container">
          {properties.map(property => (
            <CompPhoto
              key={property.listingNumber}
              property={property}
              setCheckedProperties={setCheckedProperties}
              checkedProperties={checkedProperties}
              view={view}
            />
          ))}
        </div>
        <button className="btn btn-small">Submit</button>
      </div>
    </Modal>
  )
}
