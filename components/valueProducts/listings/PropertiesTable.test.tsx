import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PropertiesTable from './PropertiesTable'

describe('PropertiesTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: [],
      type: 'Sold'
    }
    component = shallow(<PropertiesTable {...props} />)
  })
  it('should have container', () => {
    expect(component.find('.table-spacer')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
