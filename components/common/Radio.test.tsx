import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Radio from './Radio'

describe('Radio', () => {
  let component
  beforeAll(() => {
    const props = {
      value: 'test',
      label: 'test',
      onChange: () => {},
      checked: false
    }
    component = shallow(<Radio {...props} />)
  })
  it('renders radio', () => {
    expect(component.find('.radio')).toHaveLength(1)
  })

  it('renders input', () => {
    expect(component.find('.radio > label > input')).toHaveLength(1)
  })
  it('renders label', () => {
    expect(component.find('label').text()).toEqual('test')
  })

  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
