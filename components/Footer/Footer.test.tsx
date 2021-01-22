import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Footer from '.'

describe('Footer', () => {
  let component
  beforeAll(() => {
    component = shallow(<Footer />)
  })
  it('has a div with id footer', () => {
    expect(component.find('#footer').prop('id')).toEqual('footer')
  })
  it('has an image logo', () => {
    expect(component.find('img').prop('src')).toContain('footer-logo.svg')
  })
  it('has "About Us" link', () => {
    expect(component.find('a').at(0).text()).toEqual('About Us')
  })
  it('has "Privacy Policy" link', () => {
    expect(component.find('a').at(1).text()).toEqual('Privacy Policy')
    expect(component.find('a').at(1).prop('href')).toContain(
      'PrivacyPolicy.pdf'
    )
  })
  it('has "Terms of Use" link', () => {
    expect(component.find('a').at(2).text()).toEqual('Terms of Use')
    expect(component.find('a').at(2).prop('href')).toContain('TermsOfUse.pdf')
  })
  it('has "Copyright Infringement" link', () => {
    expect(component.find('a').at(3).text()).toEqual('Copyright Infringement')
  })
  it('has "Contact Us" link', () => {
    expect(component.find('a').at(4).text()).toEqual(
      'Contact Us: vox@redbellre.com'
    )
  })
  it('has copyright text', () => {
    expect(component.find('span').text().length).toBeGreaterThan(100)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
