import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Copyright from './Copyright'

describe('Copyright', () => {
  let component
  beforeAll(() => {
    component = shallow(<Copyright closeModal={() => {}} />)
  })
  it('should have copyright text', () => {
    expect(
      component.find('.copyright').find('span').text().length
    ).toBeGreaterThan(100)
    expect(component.find('.copyright-link').text()).toEqual(
      'http://www.copyright.gov/onlinesp'
    )
    expect(component.find('.copyright-link').prop('href')).toEqual(
      'http://www.copyright.gov/onlinesp'
    )
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
  })
  it('should have submit button', () => {
    expect(component.find('button').text()).toEqual('Submit')
    expect(component.find('textarea').props().placeholder).toEqual(
      'Comment Field...'
    )
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
