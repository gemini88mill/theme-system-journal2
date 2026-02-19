/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './App.tsx'

describe('App', () => {
  test('renders Navbar at the top', () => {
    render(<App />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()

    expect(screen.getByRole('tab', { name: /Switch to Journal/i })).toBeDefined()
    expect(screen.getByRole('tab', { name: /Switch to Daily Actions/i })).toBeDefined()
  })

  test('renders Journal view by default', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDefined()
    expect(screen.getByLabelText('Goal space one')).toBeDefined()
  })

  test('switches to Daily Actions view when Daily Actions tab is clicked', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: /Switch to Daily Actions/i }))

    expect(screen.getByRole('heading', { name: 'Daily Actions' })).toBeDefined()
    expect(screen.getByPlaceholderText('Add a new daily action...')).toBeDefined()
  })

  test('switches back to Journal view when Journal tab is clicked', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: /Switch to Daily Actions/i }))
    fireEvent.click(screen.getByRole('tab', { name: /Switch to Journal/i }))

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDefined()
    expect(screen.getByLabelText('Goal space one')).toBeDefined()
  })
})
