import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  let component
  beforeAll(() => {
    const props = {
      current: 'Test',
      parents: [{ path: 'parent', name: 'parent' }],
      routes: [],
      label: 'county',
      parentPath: '/'
    }
    component = shallow(<Breadcrumbs {...props} />)
  })
  it('should have links to parent', () => {
    expect(component.find('a').at(0).text()).toEqual('Home')
    expect(component.find('a').at(1).text()).toEqual('parent')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
