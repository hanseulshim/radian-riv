import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ContractProperties from './ContractProperties'

describe('ContractProperties', () => {
  let component
  beforeAll(() => {
    const props = {
      properties: []
    }
    component = shallow(<ContractProperties {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
