import React, { useEffect, useState } from 'react'
import FlipAnalysisTable from './table/FlipAnalysisTable'
import FlipTable from './table/FlipTable'
import { useOrder } from 'context/OrderProvider'
import { getFlipAnalysis, FlipAnalysisInterface } from 'api'
import GoogleMapReact from 'google-map-react'
import Marker from 'components/common/Marker'
import Checkbox from 'components/common/Checkbox'

export default function FlipAnalysis() {
  const [data, setData] = useState<FlipAnalysisInterface>({
    flipRentedAnalysis: [],
    flipSoldAnalysis: [],
    flipSold: [],
    flipForSale: [],
    flipRented: [],
    flipForRent: []
  })
  const [flipSold, setFlipSold] = useState(false)
  const [flipForSale, setFlipForSale] = useState(false)
  const [flipRented, setFlipRented] = useState(false)
  const [flipForRent, setFlipForRent] = useState(false)
  const { order } = useOrder()

  useEffect(() => {
    if (order.ordersId) {
      const getData = async () => {
        const tableData = await getFlipAnalysis(order.ordersId)
        setData(tableData)
        if (tableData.flipSold.length) {
          setFlipSold(true)
        }
        if (tableData.flipForSale.length) {
          setFlipForSale(true)
        }
        if (tableData.flipRented.length) {
          setFlipRented(true)
        }
        if (tableData.flipForRent.length) {
          setFlipForRent(true)
        }
      }
      getData()
    }
  }, [order])

  const resizeMap = (map, maps) => {
    const bounds = new maps.LatLngBounds()
    bounds.extend(new maps.LatLng(order.lat, order.lng))
    if (flipSold) {
      data.flipSold.forEach(property => {
        bounds.extend(new maps.LatLng(property.lat, property.lng))
      })
    }
    if (flipForSale) {
      data.flipForSale.forEach(property => {
        bounds.extend(new maps.LatLng(property.lat, property.lng))
      })
    }
    if (flipRented) {
      data.flipRented.forEach(property => {
        bounds.extend(new maps.LatLng(property.lat, property.lng))
      })
    }
    if (flipForRent) {
      data.flipForRent.forEach(property => {
        bounds.extend(new maps.LatLng(property.lat, property.lng))
      })
    }
    map.fitBounds(bounds)
  }

  return (
    order.ordersId && (
      <div className="flip-analysis">
        <div className="table-container">
          <FlipAnalysisTable
            tableData={data.flipSoldAnalysis}
            flipType="FLIP SOLD"
          />
          <FlipAnalysisTable
            tableData={data.flipRentedAnalysis}
            flipType="FLIP RENTED"
          />
        </div>
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.googleMapsApiKey }}
            defaultCenter={{
              lat: order.lat,
              lng: order.lng
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => resizeMap(map, maps)}
          >
            <Marker
              type="marker-subject"
              lat={order.lat}
              lng={order.lng}
              order={0}
            />
            {flipSold &&
              data.flipSold.map(property => (
                <Marker
                  key={property.resultsId}
                  order={property.rank}
                  type="marker-flip-sold"
                  lat={property.lat}
                  lng={property.lng}
                />
              ))}
            {flipForSale &&
              data.flipForSale.map(property => (
                <Marker
                  key={property.resultsId}
                  order={property.rank}
                  type="marker-flip-sale"
                  lat={property.lat}
                  lng={property.lng}
                />
              ))}
            {flipRented &&
              data.flipRented.map(property => (
                <Marker
                  key={property.resultsId}
                  order={property.rank}
                  type="marker-flip-rented"
                  lat={property.lat}
                  lng={property.lng}
                />
              ))}
            {flipForRent &&
              data.flipForRent.map(property => (
                <Marker
                  key={property.resultsId}
                  order={property.rank}
                  type="marker-flip-rent"
                  lat={property.lat}
                  lng={property.lng}
                />
              ))}
          </GoogleMapReact>
        </div>
        <div className="map-toggle">
          <div className="toggle-label-container">
            <img
              alt="marker-subject"
              src={`${process.env.baseUrl}/images/marker-subject.svg`}
            />
            <span>Subject</span>
          </div>
          <div className="toggle-label-container">
            <Checkbox
              label=""
              checked={flipSold}
              onChange={() => {
                setFlipSold(!flipSold)
              }}
            />
            <img
              alt="marker-flip-sold"
              src={`${process.env.baseUrl}/images/marker-flip-sold.svg`}
            />
            <span>Flip Sold</span>
          </div>
          <div className="toggle-label-container">
            <Checkbox
              label=""
              checked={flipRented}
              onChange={() => {
                setFlipRented(!flipRented)
              }}
            />
            <img
              alt="marker-flip-rented"
              src={`${process.env.baseUrl}/images/marker-flip-rented.svg`}
            />
            <span>Flip Rented</span>
          </div>
          <div className="toggle-label-container">
            <Checkbox
              label=""
              checked={flipForSale}
              onChange={() => {
                setFlipForSale(!flipForSale)
              }}
            />
            <img
              alt="marker-flip-sale"
              src={`${process.env.baseUrl}/images/marker-flip-sale.svg`}
            />
            <span className="toggle-label">Flip for Sale</span>
          </div>
          <div className="toggle-label-container">
            <Checkbox
              label=""
              checked={flipForRent}
              onChange={() => {
                setFlipForRent(!flipForRent)
              }}
            />
            <img
              alt="marker-flip-rent"
              src={`${process.env.baseUrl}/images/marker-flip-rent.svg`}
            />
            <span className="toggle-label">Flip for Rent</span>
          </div>
        </div>
        <span
          style={{
            fontSize: 12
          }}
        >
          * Click icons to add or remove markers from the map
        </span>
        <div className="flip-tables">
          <h2>Flip Sold</h2>
          <FlipTable tableData={data.flipSold} />
          <h2>Flip for Sale</h2>
          <FlipTable tableData={data.flipForSale} />
          <h2>Flip Rented</h2>
          <FlipTable tableData={data.flipRented} />
          <h2>Flip for Rent</h2>
          <FlipTable tableData={data.flipForRent} />
        </div>
      </div>
    )
  )
}
