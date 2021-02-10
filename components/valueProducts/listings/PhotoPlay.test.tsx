import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PhotoPlay from './PhotoPlay'

describe('PhotoPlay', () => {
  let component
  beforeAll(() => {
    const props = {
      photos: []
    }
    component = shallow(<PhotoPlay {...props} />)
  })

  it('has photo container', () => {
    expect(component.find('.play-photo-container')).toHaveLength(1)
    expect(component.find('.photo-button-row')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
