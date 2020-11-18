import { shallow } from 'enzyme'
import React from 'react'

import Footer from '../components/Footer'

describe('Footer', () => {
  let app
  beforeAll(() => {
    app = shallow(<Footer />)
  })
  it('Footer has a div with id footer', () => {
    expect(app.find('#footer').prop('id')).toEqual('footer')
  })
  it('Footer has a <span> tag with the copyright message', () => {
    expect(app.find('span').text()).toContain(
      '2020 Red Bell Real Estate, LLC. All rights reserved.'
    )
  })
})
