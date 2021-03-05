import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ListPriceTable from './ListPriceTable'

describe('ListPriceTable', () => {
  let component
  beforeAll(() => {
    const props = {
      listPrice: {
        '0-90': 1,
        '91-180': 1,
        '180-270': 1,
        '271-365': 1
      },
      type: 'test'
    }
    component = shallow(<ListPriceTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('div')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
