import React from 'react'
import Modal from 'components/common/Modal'
import { PropertyInterface } from 'api'
import CompPhoto from './CompPhoto'
import Checkbox from 'components/common/Checkbox'

interface Props {
  closeModal: () => void
  setCheckedProperties: React.Dispatch<React.SetStateAction<string[]>>
  checkedProperties: string[]
  properties: PropertyInterface[]
  view: string
}

export default function CompPhotosModal({
  closeModal,
  view,
  properties,
  checkedProperties,
  setCheckedProperties
}: Props) {
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
      </div>
      <button className="btn btn-small">Submit</button>
    </Modal>
  )
}
