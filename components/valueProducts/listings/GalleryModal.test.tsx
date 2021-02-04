import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GalleryModal from './GalleryModal'

describe('GalleryModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      photos: []
    }
    component = shallow(<GalleryModal {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
