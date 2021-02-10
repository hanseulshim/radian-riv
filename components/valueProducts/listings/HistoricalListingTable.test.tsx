import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HistoricalListingTable from './HistoricalListingTable'
import { generateProperties } from '../../../api'
describe('HistoricalListingTable', () => {
  let component
  beforeAll(() => {
    const property = generateProperties(1)
    const props = {
      tableData: property
    }
    component = shallow(<HistoricalListingTable {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
