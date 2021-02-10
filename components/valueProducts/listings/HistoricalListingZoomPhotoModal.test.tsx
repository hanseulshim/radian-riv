import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HistoricalListingZoomPhotoModal from './HistoricalListingZoomPhotoModal'

describe('HistoricalListingZoomPhotoModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      photo: ''
    }
    component = shallow(<HistoricalListingZoomPhotoModal {...props} />)
  })
  it('should have img', () => {
    expect(component.find('.photo')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
