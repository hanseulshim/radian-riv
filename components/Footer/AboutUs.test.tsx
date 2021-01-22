import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import AboutUs from './AboutUs'

describe('About Us', () => {
  let component
  beforeAll(() => {
    component = shallow(<AboutUs closeModal={() => {}} />)
  })
  it('should have one child', () => {
    expect(component.children()).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
