import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Register from './Register'

describe('Register', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {}
    }
    component = shallow(<Register {...props} />)
  })
  it('has form-row', () => {
    expect(component.find('.form-row')).toHaveLength(1)
  })
  it('has form-group', () => {
    expect(component.find('.form-group')).toHaveLength(2)
  })
  it('has a submit button', () => {
    expect(component.find('button').at(0).text()).toEqual('Agree')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
