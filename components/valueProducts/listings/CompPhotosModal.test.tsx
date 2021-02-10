import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompPhotosModal from './CompPhotosModal'
import { defaultPropertyInfo } from '../../../context/ValueProductProvider'
describe('CompPhotosModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      setCheckedProperties: () => {},
      checkedProperties: [],
      view: 'test',
      properties: [defaultPropertyInfo]
    }
    component = shallow(<CompPhotosModal {...props} />)
  })
  it('has comp-modal container', () => {
    expect(component.find('#comp-modal')).toHaveLength(1)
    expect(component.find('.comp-photos-modal')).toHaveLength(1)
    expect(component.find('.top-row')).toHaveLength(1)
    expect(component.find('.comp-photo-container')).toHaveLength(1)
  })
  it('two submit buttons', () => {
    expect(component.find('.btn')).toHaveLength(2)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
