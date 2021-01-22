import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Form from './Form'

describe('Form', () => {
  let component
  beforeAll(() => {
    const props = {
      id: 'test',
      children: <div>form</div>,
      onSubmit: async () => {},
      alert: {
        type: 'success',
        message: 'request successful'
      }
    }
    component = shallow(<Form {...props} />)
  })
  it('renders form with id', () => {
    expect(component.find('#test')).toHaveLength(1)
  })
  it('should match snapshot', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
