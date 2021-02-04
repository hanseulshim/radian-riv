import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import FlipTable from './FlipTable'

describe('FlipTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: []
    }
    component = shallow(<FlipTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('.flip-table')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
