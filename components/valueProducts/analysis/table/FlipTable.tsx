import React, { useState, useCallback } from 'react'
import Table from 'components/common/Table'
import GalleryModal from 'components/valueProducts/listings/GalleryModal'
import { formatPrice } from 'utils'

interface Props {
  tableData: any[]
}

export default function FlipTable({ tableData }: Props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [galleryModal, setGalleryModal] = useState(false)
  const [photos, setPhotos] = useState([])

  const toggleGalleryModal = () => {
    setGalleryModal(!galleryModal)
  }

  const fetchData = useCallback(async () => {
    setColumns([
      {
        Header: 'Street Address',
        accessor: 'address',
        align: 'right',
        width: 210
      },
      {
        Header: 'City',
        accessor: 'city',
        align: 'right',
        width: 200
      },
      {
        Header: 'Zip',
        accessor: 'zip',
        align: 'right',
        width: 100
      },
      {
        Header: 'Bed',
        accessor: 'bed',
        align: 'right',
        width: 75
      },
      {
        Header: 'Bath',
        accessor: 'bath',
        align: 'right',
        width: 75
      },
      {
        Header: 'SqFt',
        accessor: 'sqft',
        align: 'right',
        width: 90
      },
      {
        Header: 'Garage',
        accessor: 'garage',
        align: 'right',
        width: 75
      },
      {
        Header: 'Lot Size',
        accessor: 'lotSize',
        align: 'right',
        width: 90
      },
      {
        Header: 'Year Built',
        accessor: 'yearBuilt',
        align: 'right',
        width: 110
      },
      {
        Header: 'Target Distance',
        accessor: 'targetDistance',
        align: 'right',
        width: 100
      },
      {
        Header: 'COE 1 Sold Date',
        accessor: 'coeDate',
        align: 'right'
      },
      {
        Header: 'COE 1 Sold Price',
        accessor: row => formatPrice(row.coePrice),
        align: 'right',
        width: 175
      },
      {
        Header: 'COE 2 Sold Date',
        accessor: 'coe2Date',
        align: 'right'
      },
      {
        Header: 'COE 2 Sold Price',
        accessor: row => formatPrice(row.coe2Price),
        align: 'right',
        width: 175
      },
      {
        Header: 'Days from Flip',
        accessor: 'daysFromFlip',
        align: 'right'
      },
      {
        Header: 'Property Info',
        accessor: () => <span className="link">Learn More</span>,
        align: 'right'
      },
      {
        Header: 'Images',
        accessor: row => (
          <img
            className="link"
            src={`${process.env.baseUrl}/images/photos-link.svg`}
            alt="photos"
            onClick={() => {
              toggleGalleryModal()
              setPhotos(row.photos)
            }}
          />
        ),
        align: 'right'
      }
    ])
    setData(tableData)
  }, [tableData])

  return (
    <div className="flip-table">
      <Table columns={columns} data={data} fetchData={fetchData} width={1050} />
      {galleryModal && (
        <GalleryModal closeModal={toggleGalleryModal} photos={photos} />
      )}
    </div>
  )
}
