import React from 'react'
import Modal from 'components/common/Modal'

interface Props {
  closeModal: () => void
}

const data = [
  {
    title: 'Search Screen',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/search-screen.mp4',
    description: 'How to Search for PReviously Placed Orders',
    duration: '4:32',
    updated: '03/07/2018'
  },
  {
    title: 'How to Place a Single Order',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/single-order.mp4',
    description: 'How to place a single Radian Interactive Value order.',
    duration: '3:29',
    updated: '03/07/2018'
  },
  {
    title: 'How to Place a Bulk Order',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/bulk-order.mp4',
    description:
      'Place More Than one Radian Interactive Value Order at Once in Red Bell',
    duration: '3:40',
    updated: '03/07/2018'
  },
  {
    title: 'Subject Property Information',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/subject-property.mp4',
    description: 'Where to Find Information about the Subject Property',
    duration: '2:57',
    updated: '03/07/2018'
  },
  {
    title: 'Comparable Properties',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/comparable-properties.mp4',
    description: 'Information on Comparable Properties',
    duration: '9:10',
    updated: '03/07/2018'
  },
  {
    title: 'Define Market Area',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/market-area.mp4',
    description: 'How to Filter Comparable Properties',
    duration: '5:13',
    updated: '03/07/2018'
  },
  {
    title: 'How to Load Manual Comparables',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/manual-comparables.mp4',
    description:
      'How to Load Manual Comparables into the Radian Interactive Value product.',
    duration: '6:48',
    updated: '10/04/2018'
  },
  {
    title: 'Listing Sheets',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/listing-sheets.mp4',
    description: 'How to find and use the Red Bell listing sheets.',
    duration: '7:39',
    updated: '10/04/2018'
  },
  {
    title: 'Changing Subject Property Characteristics',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/subject-property-characteristics.mp4',
    description:
      'How to Change the Subject Property Characteristics in the Radian Interactive Value tool.',
    duration: '10:53',
    updated: '10/04/2018'
  },
  {
    title: 'Flip Report',
    fileName:
      'https://s3.amazonaws.com/assets.boostlabs/radian-riv/flip-report.mp4',
    description: 'How to see properties that have flipped in an area.',
    duration: '10:53',
    updated: '10/04/2018'
  }
]

export default function VideoTutorialModal({ closeModal }: Props) {
  return (
    <Modal closeModal={closeModal} title={''} width={1360} id="video-modal">
      <h2>Video Tutorials</h2>
      <div className="video-container">
        {data.map(videoObj => (
          <div className="video" key={videoObj.title}>
            <div className="title">{videoObj.title}</div>
            <video className="video-file" controls controlsList="nodownload">
              <source src={videoObj.fileName} type="video/mp4" />
            </video>
            <div className="description-container">
              <div className="description">{videoObj.description}</div>
              <div className="video-stats">
                <div>Duration {videoObj.duration}</div>
                <div>{videoObj.updated}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
