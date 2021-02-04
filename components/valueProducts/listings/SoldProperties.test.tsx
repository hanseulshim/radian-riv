import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SoldProperties from './SoldProperties'

describe('SoldProperties', () => {
  let component
  beforeAll(() => {
    const props = {
      properties: []
    }
    component = shallow(<SoldProperties {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
