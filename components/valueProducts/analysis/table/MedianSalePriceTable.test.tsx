import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import MedianSalePriceTable from './MedianSalePriceTable'

describe('MedianSalePriceTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: [],
      month: 'two',
      label: 'two'
    }
    component = shallow(<MedianSalePriceTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('.table-wrapper')).toHaveLength(1)
    expect(component.find('.two')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
