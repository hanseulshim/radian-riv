import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import SourceTable from './SourceTable'

describe('SourceTable', () => {
  let component
  beforeAll(() => {
    const props = {
      tableData: [],
      setSelectedSource: () => {},
      selectedSource: 'User'
    }
    component = shallow(<SourceTable {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
