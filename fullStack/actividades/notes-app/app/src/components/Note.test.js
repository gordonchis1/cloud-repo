/* global jest */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Note from './Note'

test('Render content', () => {
  const note = {
    content: 'Hola Mundo!!!!',
    important: false
  }

  const componente = render(<Note note={note} />)

  componente.getByText('Hola Mundo!!!!')
  componente.getByText('make important')
  /* expect(componente.container).toHaveTextContent('Hola Mundo!!!!') */
})

test('Clicking the button calls the event handler once', () => {
  const note = {
    content: 'Hola Mundo!!!!',
    important: true
  }

  const mockHandler = jest.fn()

  const componente = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = componente.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
