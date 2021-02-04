import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListedProperties from './ListedProperties'

describe('ListedProperties', () => {
  let component
  beforeAll(() => {
    const props = {
      properties: []
    }
    component = shallow(<ListedProperties {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
