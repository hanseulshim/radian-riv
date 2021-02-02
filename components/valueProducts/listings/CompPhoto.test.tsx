import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import CompPhoto from './CompPhoto'

describe('CompPhoto', () => {
  let component
  beforeAll(() => {
    const props = {
      property: {
        actDom: 204,
        address: '684 Willms Roads',
        agSqft: 4596,
        basement: 'Full',
        bath: 2,
        bed: 5,
        city: 'East Dean',
        coeDate: '6/25/2020',
        concessions: 16464,
        description:
          'Esse commodi et eum voluptatem rerum. Non rerum quia. Quia nisi vel minus cumque neque reprehenderit architecto et dolores. Nostrum in maiores cum. Quia ut sed omnis error cumque necessitatibus perferendis esse dolor. Provident porro aperiam dolorem dolores.',
        distressed: true,
        garage: 2,
        listDate: '12/27/2020',
        listPrice: 552470,
        listPricePerSqft: 3998,
        listingNumber: 'MDMC662271',
        listingSheetSelected: false,
        lotSize: 1,
        order: 1,
        photos: [],
        pool: 'None',
        schoolDistrict: 'Borders County Public Schools',
        soldPrice: 585277,
        sqft: 3355,
        sqftPrice: 145.15,
        subdivision: 'Fresh Chair Village',
        targetDistance: 0.68,
        totDom: 172,
        totalSqft: 4243,
        valuationPercent: 0.62,
        waterfront: 'Water Oriented: No',
        yearBuilt: 2010,
        zip: '03194-7596'
      },
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
    expect(component.find('.photo-container')).toHaveLength(1)
    expect(component.find('.detail-container')).toHaveLength(1)
    expect(component.find('.column-container')).toHaveLength(1)
    expect(component.find('.listing-export')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
