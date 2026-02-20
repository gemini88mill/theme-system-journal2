import { useMemo, useState, useEffect } from 'react'
import './Journal.css'
import type { JournalEntry, StoredJournalEntries } from './Journal.types.ts'
import { TextAreaField } from '../../atom/TextAreaField/TextAreaField.tsx'

const STORAGE_KEY = 'journal.entries.v1'

const EMPTY_ENTRY: JournalEntry = {
  goalOne: '',
  goalTwo: '',
  body: '',
  links: '',
}

const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

const formatDisplayDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map((part) => Number(part))
  const localDate = new Date(year, month - 1, day)

  return localDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const shiftDateKey = (dateKey: string, dayOffset: number) => {
  const [year, month, day] = dateKey.split('-').map((part) => Number(part))
  const localDate = new Date(year, month - 1, day)
  localDate.setDate(localDate.getDate() + dayOffset)

  return toDateKey(localDate)
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const readStoredEntries = (): StoredJournalEntries => {
  if (typeof window === 'undefined') {
    return {}
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return {}
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue)

    if (!isRecord(parsedValue)) {
      return {}
    }

    const entries: StoredJournalEntries = {}

    Object.entries(parsedValue).forEach(([dateKey, entryValue]) => {
      if (!isRecord(entryValue)) {
        return
      }

      entries[dateKey] = {
        goalOne: typeof entryValue.goalOne === 'string' ? entryValue.goalOne : '',
        goalTwo: typeof entryValue.goalTwo === 'string' ? entryValue.goalTwo : '',
        body: typeof entryValue.body === 'string' ? entryValue.body : '',
        links: typeof entryValue.links === 'string' ? entryValue.links : '',
      }
    })

    return entries
  } catch {
    return {}
  }
}

export const Journal = () => {
  const [activeDateKey, setActiveDateKey] = useState(() => toDateKey(new Date()))
  const [entries, setEntries] = useState<StoredJournalEntries>(() => readStoredEntries())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const activeEntry = entries[activeDateKey] ?? EMPTY_ENTRY
  const displayDate = useMemo(() => formatDisplayDate(activeDateKey), [activeDateKey])

  const updateActiveEntry = (field: keyof JournalEntry, value: string) => {
    setEntries((currentEntries) => {
      const currentEntry = currentEntries[activeDateKey] ?? EMPTY_ENTRY
      const nextEntry: JournalEntry = { ...currentEntry, [field]: value }

      return {
        ...currentEntries,
        [activeDateKey]: nextEntry,
      }
    })
  }

  return (
    <main className="journal-page">
      <section className="journal-sheet">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Journal</h1>
            <p className="text-sm text-slate-600">Record your daily goals and reflections.</p>
          </div>
        </header>

        <header className="journal-nav">
          <button
            type="button"
            className="journal-nav-button"
            onClick={() => setActiveDateKey((currentDateKey) => shiftDateKey(currentDateKey, -1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="journal-nav-button"
            onClick={() => setActiveDateKey((currentDateKey) => shiftDateKey(currentDateKey, 1))}
          >
            Next
          </button>
        </header>

        <div className="journal-date">
          <span className="journal-date-label">Date</span>
          <span className="journal-date-value">{displayDate}</span>
        </div>

        <TextAreaField
          ariaLabel="Goal space one"
          className="journal-input journal-goal"
          placeholder=" "
          value={activeEntry.goalOne}
          onChange={(event) => updateActiveEntry('goalOne', event.target.value)}
        />

        <TextAreaField
          ariaLabel="Goal space two"
          className="journal-input journal-goal"
          placeholder=" "
          value={activeEntry.goalTwo}
          onChange={(event) => updateActiveEntry('goalTwo', event.target.value)}
        />

        <TextAreaField
          ariaLabel="Main journal space"
          className="journal-input journal-body"
          placeholder=" "
          value={activeEntry.body}
          onChange={(event) => updateActiveEntry('body', event.target.value)}
        />

        <div className="journal-link-labels">
          <span>Continued from</span>
          <span>Continued on</span>
        </div>

        <TextAreaField
          ariaLabel="Journal links"
          className="journal-input journal-links"
          placeholder="Comma or newline separated links"
          value={activeEntry.links}
          onChange={(event) => updateActiveEntry('links', event.target.value)}
        />
      </section>
    </main>
  )
}
