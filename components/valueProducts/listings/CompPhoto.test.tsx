import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompPhoto from './CompPhoto'
import { defaultPropertyInfo } from '../../../context/ValueProductProvider'

describe('CompPhoto', () => {
  let component
  beforeAll(() => {
    const props = {
      property: defaultPropertyInfo,
      view: 'view',
      checkedProperties: [],
      setCheckedProperties: () => {}
    }
    component = shallow(<CompPhoto {...props} />)
  })
  it('has comp-photo container', () => {
    expect(component.find('.comp-photo')).toHaveLength(1)
  })
  it('has comp-photo content', () => {
    expect(component.find('.detail-container')).toHaveLength(1)
    expect(component.find('.column-container')).toHaveLength(1)
    expect(component.find('.listing-export')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
