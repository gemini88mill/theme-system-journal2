/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button.tsx'

describe('Button', () => {
  test('renders button text', () => {
    render(<Button>Save</Button>)

    const buttonElement = screen.getByRole('button', { name: 'Save' })

    expect(buttonElement).toBeDefined()
  })

  test('applies variant and size classes', () => {
    render(
      <Button size="lg" variant="secondary">
        Secondary Action
      </Button>,
    )

    const buttonElement = screen.getByRole('button', { name: 'Secondary Action' })
    const className = buttonElement.className

    expect(className).toContain('bg-slate-200')
    expect(className).toContain('px-5')
    expect(className).toContain('py-2.5')
  })

  test('calls onClick handler', () => {
    let clickCount = 0

    render(
      <Button
        onClick={() => {
          clickCount += 1
        }}
      >
        Click Me
      </Button>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Click Me' }))

    expect(clickCount).toBe(1)
  })
})
