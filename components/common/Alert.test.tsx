import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Alert from './Alert'

describe('Alert', () => {
  let component
  beforeAll(() => {
    const props = {
      type: 'success',
      message: 'Request Successful'
    }
    component = shallow(<Alert {...props} />)
  })
  it('has a div with class names', () => {
    expect(component.find('.alert')).toHaveLength(1)
    expect(component.find('.alert-success')).toHaveLength(1)
    expect(component.find('.alert-error')).toHaveLength(0)
  })
  it('has a <pre> tag with message', () => {
    expect(component.find('pre').text()).toEqual('Request Successful')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
