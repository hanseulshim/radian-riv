import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CompPhoto from './CompPhoto'

describe('CompPhoto', () => {
  let component
  beforeAll(() => {
    const property = {
      id: null,
      address: null,
      subdivision: null,
      schoolDistrict: null,
      bed: null,
      bath: null,
      agSqft: null,
      totalSqft: null,
      aveSqft: null,
      year: null,
      basement: null,
      pool: null,
      waterfront: null,
      concessions: null,
      coeDate: null,
      listDate: null,
      actDom: null,
      totDom: null,
      listPrice: null,
      soldPrice: null,
      listingNumber: null,
      exportMls: null,
      distressed: null,
      targetDistance: null,
      description: null,
      photos: [],
      rank: null,
      checked: null
    }
    const props = {
      property,
      view: 'view',
      checkedProperties: [],
      setCheckedProperties: () => {}
    }
    component = shallow(<CompPhoto {...props} />)
  })
  it('has comp-photo container', () => {
    expect(component.find('.comp-photo')).toHaveLength(1)
  })
  it('has comp-photo content', () => {
    expect(component.find('.detail-container')).toHaveLength(1)
    expect(component.find('.column-container')).toHaveLength(1)
    expect(component.find('.listing-export')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
