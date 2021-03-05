import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HistoricalListingTable from './HistoricalListingTable'
import { getHistoricalListingProperty } from '../../../api'
describe('HistoricalListingTable', () => {
  let component
  beforeAll(async () => {
    const property = await getHistoricalListingProperty('test123', '123')
    const props = {
      tableData: [property]
    }
    component = shallow(<HistoricalListingTable {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
