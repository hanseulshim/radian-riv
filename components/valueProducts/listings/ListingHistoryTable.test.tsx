import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListingHistoryTable from './ListingHistoryTable'

describe('ListingHistoryTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: [],
      setListingHistory: () => {}
    }
    component = shallow(<ListingHistoryTable {...props} />)
  })

  it('has table container', () => {
    expect(component.find('.listing-history-table')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
