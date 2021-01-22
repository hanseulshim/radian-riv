import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ContactUs from './ContactUs'

describe('Contact us', () => {
  let component
  beforeAll(() => {
    component = shallow(<ContactUs closeModal={() => {}} />)
  })
  it('should have form classes', () => {
    expect(component.find('.form-row')).toHaveLength(1)
    expect(component.find('.form-spacer')).toHaveLength(2)
  })
  it('should have text area', () => {
    expect(component.find('textarea').props().value).toEqual('')
    component
      .find('textarea')
      .simulate('change', { target: { value: '12345' } })
    expect(component.find('textarea').props().value).toEqual('12345')
    expect(component.find('textarea').props().placeholder).toEqual(
      'Comment Field...'
    )
  })
  it('should have submit button', () => {
    expect(component.find('button').text()).toEqual('Submit')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
