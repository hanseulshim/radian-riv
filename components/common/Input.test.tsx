import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Input from './Input'

describe('Input', () => {
  let component
  beforeAll(() => {
    const props = {
      value: 'test',
      label: 'test',
      onChange: () => {},
      error: 'error'
    }
    component = shallow(<Input {...props} />)
  })
  it('renders input-group', () => {
    expect(component.find('.input-group')).toHaveLength(1)
  })
  it('renders error-input', () => {
    expect(component.find('input.error-input')).toHaveLength(1)
  })
  it('renders label', () => {
    expect(component.find('label.input-label').text()).toEqual('test')
  })
  it('renders error message', () => {
    expect(component.find('span.error-input-message').text()).toEqual('error')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
