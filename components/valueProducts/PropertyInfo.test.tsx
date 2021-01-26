import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import PropertyInfo from './PropertyInfo'

describe('Property Info', () => {
  let component
  beforeAll(() => {
    component = shallow(<PropertyInfo />)
  })
  it('has h1 tag and lock button', () => {
    expect(component.find('h1').text()).toEqual('RIV Property Info')
    expect(component.find('.btn-icon').text()).toEqual('Lock')
    expect(component.find('.icon-container > img').prop('src')).toContain(
      'lock.svg'
    )
  })
  it('has three top row buttons', () => {
    expect(component.find('button').at(1).text()).toEqual('Re-Order RIV')
    expect(component.find('button').at(2).text()).toEqual(
      'Order Rental Analysis'
    )
    expect(component.find('button').at(3).text()).toEqual(
      'Change Property Characteristics'
    )
  })
  it('has 7 icons', () => {
    expect(component.find('.icon-row > .icon').at(0).prop('src')).toContain(
      'download-pdf.svg'
    )
    expect(component.find('.icon-row > .icon').at(1).prop('src')).toContain(
      'download-excel.svg'
    )
    expect(component.find('.icon-row > .icon').at(2).prop('src')).toContain(
      'aerial-map.svg'
    )
    expect(component.find('.icon-row > .icon').at(3).prop('src')).toContain(
      'cost.svg'
    )
    expect(component.find('.icon-row > .icon').at(4).prop('src')).toContain(
      'property-info.svg'
    )
    expect(component.find('.icon-row > .icon').at(5).prop('src')).toContain(
      'photos.svg'
    )
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
