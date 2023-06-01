import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'

import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  const btnText = 'show'

  beforeEach(() => {
    component = render(<Togglable btnText={btnText}><div>divTest</div></Togglable>)
  })

  test('render its children', () => {
    component.getByText('divTest')
  })

  test('render its children but they are not visible', () => {
    const element = component.getByText('divTest')

    expect(element.parentNode).toHaveStyle('display: none')
  })

  test('after clicking its children must be show', () => {
    const button = component.getByText(btnText)
    fireEvent.click(button)

    const element = component.getByText('divTest')
    expect(element.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const buttonShow = component.getByText(btnText)
    fireEvent.click(buttonShow)

    const buttonCancel = component.getByText('cancel')
    fireEvent.click(buttonCancel)
    const element = component.getByText('divTest')

    expect(element.parentNode).toHaveStyle('display: none')
  })
})
