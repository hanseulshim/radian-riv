import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import LoginForm from './LoginForm'

describe('LoginForm', () => {
  let component
  beforeAll(() => {
    const props = {
      showPasswordModal: () => {},
      showRegisterModal: () => {}
    }
    component = shallow(<LoginForm {...props} />)
  })
  it('has login-form div', () => {
    expect(component.find('.login-form')).toHaveLength(1)
  })
  it('has a submit button', () => {
    expect(component.find('button').at(0).text()).toEqual('Login')
  })
  it('has a reset password', () => {
    expect(component.find('#reset-password-button').text()).toEqual(
      'Reset Your Password'
    )
  })
  it('has a register button', () => {
    expect(component.find('button').at(2).text()).toEqual('Register for free')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
