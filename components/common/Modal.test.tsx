import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Modal from './Modal'

describe('Modal', () => {
  let component
  beforeAll(() => {
    const props = {
      title: 'title',
      closeModal: () => {}
    }
    component = shallow(
      <Modal {...props}>
        <div>children</div>
      </Modal>
    )
  })
  it('renders modal-container', () => {
    expect(component.find('.modal-container')).toHaveLength(1)
  })
  it('renders form', () => {
    expect(component.find('.form')).toHaveLength(1)
  })
  it('renders title', () => {
    expect(component.find('h2.form-title').text()).toEqual('title')
  })
  it('has close image', () => {
    expect(component.find('img').prop('src')).toContain('icon_x.svg')
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
