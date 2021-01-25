import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Table from './Table'

describe('Table', () => {
  let component
  beforeAll(() => {
    const props = {
      columns: [],
      data: [],
      fetchData: () => {}
    }
    component = shallow(<Table {...props} />)
  })
  it('renders table container', () => {
    expect(component.find('.table-container')).toHaveLength(1)
  })
  it('renders table', () => {
    expect(component.find('.table')).toHaveLength(1)
    expect(component.find('.styled-table-row')).toHaveLength(0)
  })
  it('should match snapshot after clicking image', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
