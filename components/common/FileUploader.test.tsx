import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import FileUploader from './FileUploader'

describe('FileUploader', () => {
  let component
  beforeAll(() => {
    const props = {
      handleFile: () => {},
      selectedFile: null
    }
    component = shallow(<FileUploader {...props} />)
  })
  it('renders container', () => {
    expect(component.find('.custom-file-uploader')).toHaveLength(1)
  })
  it('has no label if no file is selected', () => {
    expect(component.find('span').exists()).toBeFalsy()
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
