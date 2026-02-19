/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, within } from '@testing-library/react'
import { Themes } from './Themes.tsx'

describe('Themes', () => {
  test('renders THEME label and input', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    expect(view.getByText('THEME')).toBeDefined()
    const themeInput = view.getAllByRole('textbox')[0]
    expect(themeInput).toBeDefined()
  })

  test('renders DESCRIPTION label and textarea', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    expect(view.getByText('DESCRIPTION')).toBeDefined()
    expect(view.getByLabelText('Theme description')).toBeDefined()
  })

  test('renders Ideal Outcomes section with at least one outcome row', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    expect(view.getByText('Ideal Outcomes')).toBeDefined()
    const checkboxes = view.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(1)
  })

  test('adds new outcome when Add outcome is clicked', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    const addButton = view.getByRole('button', { name: /Add new ideal outcome/i })
    const initialCheckboxes = view.getAllByRole('checkbox')
    fireEvent.click(addButton)
    const afterCheckboxes = view.getAllByRole('checkbox')
    expect(afterCheckboxes.length).toBe(initialCheckboxes.length + 1)
  })

  test('updates theme title when typing in theme input', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    const themeInput = view.getAllByRole('textbox')[0]
    fireEvent.change(themeInput, { target: { value: 'My Theme' } })

    if (!(themeInput instanceof HTMLInputElement)) {
      throw new Error('Expected input element')
    }
    expect(themeInput.value).toBe('My Theme')
  })

  test('updates description when typing in description textarea', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    const textarea = view.getByLabelText('Theme description')
    fireEvent.change(textarea, { target: { value: 'My description' } })

    if (!(textarea instanceof HTMLTextAreaElement)) {
      throw new Error('Expected textarea element')
    }
    expect(textarea.value).toBe('My description')
  })

  test('updates outcome when typing in outcome input', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    const textboxes = view.getAllByRole('textbox')
    const firstOutcomeInput = textboxes[2]
    fireEvent.change(firstOutcomeInput, { target: { value: 'First outcome' } })

    if (!(firstOutcomeInput instanceof HTMLInputElement)) {
      throw new Error('Expected input element')
    }
    expect(firstOutcomeInput.value).toBe('First outcome')
  })

  test('toggles outcome checkbox', () => {
    const { container } = render(<Themes />)
    const view = within(container)

    const checkbox = view.getAllByRole('checkbox')[0]

    if (!(checkbox instanceof HTMLInputElement)) {
      throw new Error('Expected checkbox element')
    }
    expect(checkbox.checked).toBe(false)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })
})
