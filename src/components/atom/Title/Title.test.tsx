/// <reference lib="dom" />

import { afterEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'
import { Title } from './Title.tsx'

afterEach(cleanup)

describe('Title', () => {
  test('renders children as h1', () => {
    render(<Title>Page Title</Title>)

    const heading = screen.getByRole('heading', { level: 1, name: 'Page Title' })

    expect(heading).toBeDefined()
  })

  test('applies white text and typography classes', () => {
    render(<Title>Styled Title</Title>)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading.className).toContain('text-white')
    expect(heading.className).toContain('text-2xl')
    expect(heading.className).toContain('font-bold')
    expect(heading.className).toContain('md:text-3xl')
  })

  test('renders complex children', () => {
    render(
      <Title>
        <span>Complex</span> <strong>Title</strong>
      </Title>,
    )

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading.textContent).toContain('Complex')
    expect(heading.textContent).toContain('Title')
  })
})
