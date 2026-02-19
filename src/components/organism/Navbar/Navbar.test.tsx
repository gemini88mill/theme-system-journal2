/// <reference lib="dom" />

import { describe, expect, test } from 'bun:test'
import { fireEvent, render, within } from '@testing-library/react'
import { Navbar } from './Navbar.tsx'

describe('Navbar', () => {
  test('renders both Journal and Daily Actions options', () => {
    const { container } = render(
      <Navbar activeView="journal" onViewChange={() => {}} />,
    )
    const view = within(container)

    expect(view.getByRole('tab', { name: /Switch to Journal/i })).toBeDefined()
    expect(view.getByRole('tab', { name: /Switch to Daily Actions/i })).toBeDefined()
  })

  test('marks active view with aria-selected', () => {
    const { container } = render(
      <Navbar activeView="journal" onViewChange={() => {}} />,
    )
    const view = within(container)

    const journalTab = view.getByRole('tab', { name: /Switch to Journal/i })
    const dailyActionsTab = view.getByRole('tab', { name: /Switch to Daily Actions/i })

    expect(journalTab.getAttribute('aria-selected')).toBe('true')
    expect(dailyActionsTab.getAttribute('aria-selected')).toBe('false')
  })

  test('marks Daily Actions as active when activeView is daily-actions', () => {
    const { container } = render(
      <Navbar activeView="daily-actions" onViewChange={() => {}} />,
    )
    const view = within(container)

    const journalTab = view.getByRole('tab', { name: /Switch to Journal/i })
    const dailyActionsTab = view.getByRole('tab', { name: /Switch to Daily Actions/i })

    expect(journalTab.getAttribute('aria-selected')).toBe('false')
    expect(dailyActionsTab.getAttribute('aria-selected')).toBe('true')
  })

  test('calls onViewChange with journal when Journal tab is clicked', () => {
    let receivedView: 'journal' | 'daily-actions' | null = null
    const onViewChange = (view: 'journal' | 'daily-actions') => {
      receivedView = view
    }

    const { container } = render(
      <Navbar activeView="daily-actions" onViewChange={onViewChange} />,
    )
    const view = within(container)

    fireEvent.click(view.getByRole('tab', { name: /Switch to Journal/i }))

    expect(receivedView === 'journal').toBe(true)
  })

  test('calls onViewChange with daily-actions when Daily Actions tab is clicked', () => {
    let receivedView: 'journal' | 'daily-actions' | null = null
    const onViewChange = (view: 'journal' | 'daily-actions') => {
      receivedView = view
    }

    const { container } = render(
      <Navbar activeView="journal" onViewChange={onViewChange} />,
    )
    const view = within(container)

    fireEvent.click(view.getByRole('tab', { name: /Switch to Daily Actions/i }))

    expect(receivedView === 'daily-actions').toBe(true)
  })
})
