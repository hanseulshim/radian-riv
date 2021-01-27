import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import MapLegend from './MapLegend'

describe('Map Legend', () => {
  let component
  beforeAll(() => {
    component = shallow(<MapLegend />)
  })
  it('should have a legend title', () => {
    expect(component.find('.legend-title').toHaveLength(1))
  })
  it('should have 6 legend items', () => {
    expect(component.find('.item').toHaveLength(6))
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
