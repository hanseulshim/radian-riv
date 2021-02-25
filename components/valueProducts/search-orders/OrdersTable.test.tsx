import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import OrdersTable from './OrdersTable'

describe('OrdersTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: []
    }
    component = shallow(<OrdersTable {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
