/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { InputField } from './InputField.tsx'

describe('InputField', () => {
  test('renders with placeholder and value', () => {
    render(
      <InputField onChange={() => {}} placeholder="Action name" value="Stay Focused?" />,
    )

    const inputElement = screen.getByPlaceholderText('Action name')

    expect(inputElement).toBeDefined()

    if (!(inputElement instanceof HTMLInputElement)) {
      throw new Error('Expected input element')
    }

    expect(inputElement.value).toBe('Stay Focused?')
  })

  test('calls onChange when user types', () => {
    let lastValue = ''

    render(
      <InputField
        onChange={(event) => {
          lastValue = event.target.value
        }}
        placeholder="Action"
        value=""
      />,
    )

    const inputElement = screen.getByPlaceholderText('Action')
    fireEvent.change(inputElement, { target: { value: 'Exercise?' } })

    expect(lastValue).toBe('Exercise?')
  })
})
