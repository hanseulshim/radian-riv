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
      fetchData: () => {},
      getColWidth: () => {}
    }
    component = shallow(<Table {...props} />)
  })
  it('renders table container', () => {
    expect(component.find('.table-container')).toHaveLength(1)
    expect(component.find('.table-wrap')).toHaveLength(1)
  })
  it('renders table', () => {
    expect(component.find('table.styled-table')).toHaveLength(1)
    expect(component.find('th.styled-table-head')).toHaveLength(0)
    expect(component.find('tr.styled-table-row')).toHaveLength(0)
  })
  it('should match snapshot after clicking image', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
