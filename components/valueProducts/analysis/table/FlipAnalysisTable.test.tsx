import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import FlipAnalysisTable from './FlipAnalysisTable'

describe('FlipAnalysisTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: [],
      flipType: 'test'
    }
    component = shallow(<FlipAnalysisTable {...props} />)
  })
  it('get table container', () => {
    expect(component.find('div')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
