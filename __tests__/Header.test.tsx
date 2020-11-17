import { shallow } from 'enzyme'
import * as React from 'react'

import Header from '../components/Header'

describe('Header', () => {
  let app
  beforeAll(() => {
    app = shallow(<Header />)
  })
  it('Header has a logo', () => {
    expect(app.find('img').prop('src')).toEqual('/header-logo.svg')
  })
  it('Header has a H2 tag with "Radian Interactive Value"', () => {
    expect(app.find('h2').text()).toContain('Radian Interactive Value')
  })
})
