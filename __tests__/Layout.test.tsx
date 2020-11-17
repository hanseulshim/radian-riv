import { shallow } from 'enzyme'
import * as React from 'react'

import Layout from '../components/Layout'

describe('Layout', () => {
  let app
  beforeAll(() => {
    app = shallow(<Layout />)
  })
  it('Layout has a div with id layout', () => {
    expect(app.find('#layout').prop('id')).toEqual('layout')
  })
  it('Layout has a div with id main"', () => {
    expect(app.find('#main').prop('id')).toEqual('main')
  })
})
