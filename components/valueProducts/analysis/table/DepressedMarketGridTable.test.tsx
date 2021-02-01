import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import DepressedMarketGridTable from './DepressedMarketGridTable'

describe('DepressedMarketGridTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: []
    }
    component = shallow(<DepressedMarketGridTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('div')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
