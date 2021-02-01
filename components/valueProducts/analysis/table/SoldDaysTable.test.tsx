import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import SoldDaysTable from './SoldDaysTable'

describe('SoldDaysTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: []
    }
    component = shallow(<SoldDaysTable {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
