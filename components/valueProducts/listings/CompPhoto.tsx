import React, { useState } from 'react'
import { PropertyInterface } from 'api'
import { formatNullString, formatPrice } from 'utils'
import Checkbox from 'components/common/Checkbox'
import PhotoPlay from './PhotoPlay'

interface Props {
  property: PropertyInterface
  view: string
  checkedProperties: string[]
  setCheckedProperties: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CompPhoto({
  property,
  view,
  checkedProperties,
  setCheckedProperties
}: Props) {
  const [listingChecked, setListingChecked] = useState(false)
  const [showDetails, toggleShowDetails] = useState(true)
  const getImagePath = (): string => {
    let icon = ''
    icon =
      view === 'Under Contract'
        ? 'contract'
        : view === 'Sold'
        ? 'sold'
        : 'listed'
    return property.distressed ? `distressed-${icon}` : icon
  }

  const checked = checkedProperties.includes(property.listingNumber)

  return (
    <div className="comp-photo">
      <div className="info-row">
        <div className="icon-row">
          <img
            className="icon"
            src={`${process.env.baseUrl}/images/${getImagePath()}.svg`}
            alt="property type"
          />
          <span style={{ fontWeight: 'bold' }}>
            #{formatNullString(property.order)}
          </span>
          <span style={{ marginLeft: '10px' }}>
            {view === 'Under Contract'
              ? view
              : `${view} for ${formatNullString(
                  formatPrice(
                    view === 'Sold' ? property.soldPrice : property.listingPrice
                  )
                )}`}
          </span>
        </div>
        <div className="icon-row">
          <span style={{ marginRight: 10 }}>
            {formatNullString(property.targetDistance)} miles
          </span>
          <Checkbox
            label=""
            checked={checked}
            onChange={() => {
              if (!checked) {
                const arr = checkedProperties.slice()
                arr.push(property.listingNumber)
                setCheckedProperties(arr)
              } else {
                const index = checkedProperties.findIndex(
                  num => num === property.listingNumber
                )
                const arr = checkedProperties.slice()
                arr.splice(index, 1)
                setCheckedProperties(arr)
              }
            }}
            leftLabel
            small
          />
        </div>
      </div>
      <PhotoPlay photos={property.photos} />
      <div className="detail-container">
        <div className="address">{formatNullString(property.address)}</div>
        <div className="label-row">
          <div className="label">Subdivision:</div>
          <span>{formatNullString(property.subdivision)}</span>
        </div>
        <div className="label-row">
          <div className="label">School District:</div>
          <span>{formatNullString(property.schoolDistrict)}</span>
        </div>
        <div className="toggle-button-container">
          <span className="spacer" />
          <div className="toggle-button">
            <div
              onClick={() => toggleShowDetails(!showDetails)}
              className={`toggle${showDetails ? ' active' : ''}`}
            >
              Details
            </div>
            <div
              onClick={() => toggleShowDetails(!showDetails)}
              className={`toggle${!showDetails ? ' active' : ''}`}
            >
              Description
            </div>
          </div>
          <span className="spacer" />
        </div>
        {showDetails ? (
          <div className="column-container">
            <div className="column">
              <div className="label-row">
                <div className="label">Bed</div>
                <span>{formatNullString(property.bed)}</span>
              </div>
              <div className="label-row">
                <div className="label">Bath</div>
                <span>{formatNullString(property.bath)}</span>
              </div>
              <div className="label-row">
                <div className="label">A.G. SQFT</div>
                <span>{formatNullString(property.agSqft)}</span>
              </div>
              <div className="label-row">
                <div className="label">Total SQFT</div>
                <span>{formatNullString(property.totalSqft)}</span>
              </div>
              <div className="label-row">
                <div className="label">AVE SQFT</div>
                <span>{formatNullString(property.sqft)}</span>
              </div>
              <div className="label-row">
                <div className="label">Year Built</div>
                <span>{formatNullString(property.yearBuilt)}</span>
              </div>
              <div className="label-row">
                <div className="label">Basement</div>
                <span>{formatNullString(property.basement)}</span>
              </div>
              <div className="label-row">
                <div className="label">Pool</div>
                <span>{formatNullString(property.pool)}</span>
              </div>
              <div className="label-row">
                <div className="label">Waterfront</div>
                <span>{formatNullString(property.waterfront)}</span>
              </div>
            </div>
            <div className="column">
              <div className="label-row">
                <div className="label">Concessions</div>
                <span>
                  {formatNullString(formatPrice(property.concessions))}
                </span>
              </div>
              <div className="label-row">
                <div className="label">COE Date</div>
                <span>{formatNullString(property.coeDate)}</span>
              </div>
              <div className="label-row">
                <div className="label">List Date</div>
                <span>{formatNullString(property.listingDate)}</span>
              </div>
              <div className="label-row">
                <div className="label">ACT DOM</div>
                <span>{formatNullString(property.actDom)}</span>
              </div>
              <div className="label-row">
                <div className="label">TOT DOM</div>
                <span>{formatNullString(property.totDom)}</span>
              </div>
              <div className="label-row">
                <div className="label">List Price</div>
                <span>
                  {formatNullString(formatPrice(property.listingPrice))}
                </span>
              </div>
              <div className="label-row">
                <div className="label">Listing #</div>
                <span className="link">
                  {formatNullString(property.listingNumber)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="description-container">{property.description}</div>
        )}
        <div className="listing-export">
          <Checkbox
            label="Add Listing Sheet to Export"
            checked={listingChecked}
            onChange={() => {
              setListingChecked(!listingChecked)
            }}
            small
          />
        </div>
      </div>
    </div>
  )
}
