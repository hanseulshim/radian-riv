import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import CustomSelect from './CustomSelect'

describe('CustomSelect', () => {
  let component
  beforeAll(() => {
    const props = {
      options: [{ label: 'test', value: 'test' }],
      value: { label: 'test', value: 'test' },
      label: 'test',
      onChange: () => {}
    }
    component = shallow(<CustomSelect {...props} />)
  })
  it('renders container', () => {
    expect(component.find('.custom-select-container')).toHaveLength(1)
  })
  it('has label component', () => {
    expect(component.find('.custom-select-label').text()).toEqual('test')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
