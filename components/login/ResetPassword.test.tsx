import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ResetPassword from './ResetPassword'

describe('ResetPassword', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {}
    }
    component = shallow(<ResetPassword {...props} />)
  })
  it('has a submit button', () => {
    expect(component.find('button').at(0).text()).toEqual('Reset Password')
  })
  it('has info text', () => {
    expect(component.find('.info').text().length).toBeGreaterThan(100)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
