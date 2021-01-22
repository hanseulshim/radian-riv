import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Layout from './Layout'

describe('Layout', () => {
  let component
  beforeAll(() => {
    component = shallow(
      <Layout>
        <div>test</div>
      </Layout>
    )
  })
  it('has a div with id', () => {
    expect(component.find('#layout')).toHaveLength(1)
  })
  it('should have title', () => {
    expect(component.find('title').text()).toEqual('Radian RIV')
  })
  it('should have link to favicon', () => {
    expect(component.find('link').prop('href')).toContain('favicon.ico')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
