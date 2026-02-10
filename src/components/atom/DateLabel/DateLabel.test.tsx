/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { DateLabel } from './DateLabel.tsx'

describe('DateLabel', () => {
  test('formats date key as MM/DD', () => {
    render(<DateLabel dateKey="2026-02-14" />)

    expect(screen.getByText('02/14')).toBeDefined()
  })

  test('renders expected visual classes', () => {
    render(<DateLabel dateKey="2026-01-03" />)

    const dateElement = screen.getByText('01/03')
    const className = dateElement.className

    expect(className).toContain('border')
    expect(className).toContain('bg-slate-100')
    expect(className).toContain('text-xs')
  })
})
