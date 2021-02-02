import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import VideoTutorialModal from './VideoTutorialModal'

describe('VideoTutorialModal', () => {
  let component
  beforeAll(() => {
    const props = {
      closeModal: () => {}
    }
    component = shallow(<VideoTutorialModal {...props} />)
  })
  it('has video-modal container', () => {
    expect(component.find('#video-modal')).toHaveLength(1)
    expect(component.find('h2').text()).toEqual('Video Tutorials')
    expect(component.find('.video-container')).toHaveLength(1)
  })
  it('has list of video containers content', () => {
    expect(component.find('.video')).toHaveLength(10)
    expect(component.find('.title')).toHaveLength(10)
    expect(component.find('.video-file')).toHaveLength(10)
    expect(component.find('.description-container')).toHaveLength(10)
    expect(component.find('.description')).toHaveLength(10)
    expect(component.find('.video-stats')).toHaveLength(10)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
