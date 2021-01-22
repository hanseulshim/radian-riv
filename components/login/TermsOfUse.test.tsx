import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import TermsOfUse from './TermsOfUse'

describe('TermsOfUse', () => {
  let component
  beforeAll(() => {
    component = shallow(<TermsOfUse />)
  })
  it('has terms-of-use container', () => {
    expect(component.find('.terms-of-use')).toHaveLength(1)
  })
  it('has terms of use title', () => {
    expect(component.find('h4').text()).toEqual('Terms of Use:')
  })
  it('has object to display pdf', () => {
    expect(component.find('object').prop('data')).toContain('TermsOfUse.pdf')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
