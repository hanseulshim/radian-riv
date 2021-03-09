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

interface WarningProps {
  closeModal: () => void
}

const WarningModal = ({ closeModal }: WarningProps) => {
  return (
    <Modal title="" closeModal={closeModal}>
      <p className="my-10">
        Three or more comparables must be checked to recalculate value.
      </p>
    </Modal>
  )
}

interface Props {
  closeModal: () => void
  view: string
  orderId: string
}

export default function CompPhotosModal({ closeModal, view, orderId }: Props) {
  const [checkedProperties, setCheckedProperties] = useState([])
  const [warningModal, setWarningModal] = useState(false)
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

  const toggleWarningModal = () => {
    setWarningModal(!warningModal)
  }

  const onSubmit = () => {
    if (checkedProperties.length < 3) {
      toggleWarningModal()
    } else {
      console.log('submitted')
    }
  }

  return (
    <Modal closeModal={closeModal} title={''} percent={90} id="comp-modal">
      <div className="comp-photos-modal">
        <div className="top-row">
          <button className="btn btn-small" onClick={onSubmit}>
            Submit
          </button>
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
        <button className="btn btn-small" onClick={onSubmit}>
          Submit
        </button>
      </div>
      {warningModal && <WarningModal closeModal={toggleWarningModal} />}
    </Modal>
  )
}
