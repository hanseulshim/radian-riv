import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  let component
  beforeAll(() => {
    const props = {
      current: 'Test',
      parents: [{ path: 'parent', name: 'parent' }]
    }
    component = shallow(<Breadcrumbs {...props} />)
  })
  it('has a div with id', () => {
    expect(component.find('#breadcrumbs')).toHaveLength(1)
  })
  it('should have links to parent', () => {
    expect(component.find('a').at(0).text()).toEqual('Home')
    expect(component.find('a').at(1).text()).toEqual('parent')
  })
  it('should display current path', () => {
    expect(component.find('div').at(1).text()).toEqual('/Test')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
