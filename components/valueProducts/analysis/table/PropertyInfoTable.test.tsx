import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import PropertyInfoTable from './PropertyInfoTable'

describe('PropertyInfoTable', () => {
  let component
  beforeAll(() => {
    const props = {
      views: ['one', 'two', 'three'],
      currentView: 'one',
      setCurrentView: () => {}
    }
    component = shallow(<PropertyInfoTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('.property-tabs')).toHaveLength(1)
  })
  it('get tab container', () => {
    expect(component.find('.tab-container')).toHaveLength(1)
  })
  it('have three total tags and one active tab', () => {
    expect(component.find('.tab-container > .active')).toHaveLength(1)
    expect(component.find('.tab-container > li')).toHaveLength(3)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
