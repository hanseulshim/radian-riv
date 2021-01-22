import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ProfileMenu from './ProfileMenu'

describe('ProfileMenu', () => {
  let component
  beforeAll(() => {
    component = shallow(<ProfileMenu />)
  })
  it('renders profile-menu', () => {
    expect(component.find('.profile-menu')).toHaveLength(1)
  })
  it('renders profile image', () => {
    expect(component.find('img#profile-logo').prop('src')).toContain(
      'profile.svg'
    )
  })
  it('should match snapshot before clicking image', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
  it('render menu container on click', () => {
    component.find('#profile-logo').simulate('click')
    expect(component.find('ul.menu-container')).toHaveLength(1)
    expect(component.find('li')).toHaveLength(3)
  })
  it('should match snapshot after clicking image', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
