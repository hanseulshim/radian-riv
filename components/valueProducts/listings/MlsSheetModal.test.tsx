import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MlsSheetModal from './MlsSheetModal'

describe('MlsSheetModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {},
      mlsNumber: null
    }
    component = shallow(<MlsSheetModal {...props} />)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
