import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HistoricalListingModal from './HistoricalListingModal'
describe('HistoricalListingModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      resultsId: '123',
      title: 'SDF'
    }
    component = shallow(<HistoricalListingModal {...props} />)
  })
  it('contains compnent classes', () => {
    expect(component.find('.top-row')).toHaveLength(1)
    expect(component.find('.listing-info')).toHaveLength(1)
    expect(component.find('.listing-image')).toHaveLength(1)
    expect(component.find('.info-container')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
