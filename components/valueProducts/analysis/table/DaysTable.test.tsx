import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import DaysTable from './DaysTable'

describe('DaysTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: []
    }
    component = shallow(<DaysTable {...props} />)
  })
  it('get table spacer container', () => {
    expect(component.find('.table-spacer')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
