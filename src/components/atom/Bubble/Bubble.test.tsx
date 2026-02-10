/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { Bubble } from './Bubble.tsx'

describe('Bubble', () => {
  test('renders an icon-only button with accessible label', () => {
    render(<Bubble ariaLabel="Toggle action bubble" onToggle={() => {}} state="unfilled" />)

    const bubbleButton = screen.getByRole('button', { name: 'Toggle action bubble' })

    expect(bubbleButton).toBeDefined()
  })

  test('uses half-filled icon when state is halfFilled', () => {
    render(<Bubble ariaLabel="Half state bubble" onToggle={() => {}} state="halfFilled" />)

    const bubbleButton = screen.getByRole('button', { name: 'Half state bubble' })
    const svgElement = bubbleButton.querySelector('svg')

    if (svgElement === null) {
      throw new Error('Bubble icon not rendered')
    }

    expect(svgElement.getAttribute('data-icon')).toBe('circle-half-stroke')
  })

  test('uses unfilled visual class for unfilled state', () => {
    render(<Bubble ariaLabel="Unfilled bubble" onToggle={() => {}} state="unfilled" />)

    const bubbleButton = screen.getByRole('button', { name: 'Unfilled bubble' })
    const svgElement = bubbleButton.querySelector('svg')

    if (svgElement === null) {
      throw new Error('Bubble icon not rendered')
    }

    expect(svgElement.className).toContain('text-slate-300')
  })

  test('calls onToggle when clicked', () => {
    let clickCount = 0

    render(
      <Bubble
        ariaLabel="Interactive bubble"
        onToggle={() => {
          clickCount += 1
        }}
        state="filled"
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Interactive bubble' }))

    expect(clickCount).toBe(1)
  })
})
