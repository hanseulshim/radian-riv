import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import CountyLayout from './CountyLayout'

describe('Layout', () => {
  let component
  beforeAll(() => {
    component = shallow(
      <CountyLayout label="osidjf">
        <div>sdfsd</div>
      </CountyLayout>
    )
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
