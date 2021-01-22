import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  let component
  beforeAll(() => {
    const props = {
      label: 'Test',
      checked: false,
      onChange: () => {},
      disabled: true
    }
    component = shallow(<Checkbox {...props} />)
  })
  it('has a div with checked', () => {
    expect(component.find('.styled-checkbox')).toHaveLength(1)
    expect(component.find('.checked')).toHaveLength(0)
  })
  it('has hidden class', () => {
    expect(component.find('.hidden')).toHaveLength(1)
  })
  it('label should be disabled', () => {
    expect(component.find('span.disabled')).toHaveLength(1)
  })
  it('label should match value passed in', () => {
    expect(component.find('span.disabled').text()).toEqual('Test')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
