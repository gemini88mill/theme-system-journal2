import { useState } from 'react'
import './Themes.css'
import type { IdealOutcome } from './Themes.types.ts'
import { InputField } from '../../atom/InputField/InputField.tsx'
import { TextAreaField } from '../../atom/TextAreaField/TextAreaField.tsx'

let outcomeIdCounter = 0
const nextOutcomeId = () => {
  outcomeIdCounter += 1
  return `outcome-${outcomeIdCounter}`
}

export const Themes = () => {
  const [themeTitle, setThemeTitle] = useState('')
  const [description, setDescription] = useState('')
  const [outcomes, setOutcomes] = useState<IdealOutcome[]>([
    { id: nextOutcomeId(), text: '', checked: false },
  ])

  const addOutcome = () => {
    setOutcomes((prev) => [...prev, { id: nextOutcomeId(), text: '', checked: false }])
  }

  const updateOutcome = (id: string, field: 'text' | 'checked', value: string | boolean) => {
    setOutcomes((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    )
  }

  return (
    <main className="themes-page">
      <section className="themes-sheet">
        <div>
          <span className="themes-label">THEME</span>
          <div className="themes-content" style={{ marginTop: '0.25rem' }}>
            <InputField
              value={themeTitle}
              onChange={(e) => setThemeTitle(e.target.value)}
              placeholder=" "
            />
          </div>
        </div>

        <div>
          <span className="themes-label">DESCRIPTION</span>
          <div className="themes-content" style={{ marginTop: '0.25rem' }}>
            <TextAreaField
              ariaLabel="Theme description"
              className="themes-input themes-textarea"
              placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="themes-outcomes-section">
          <span className="themes-outcomes-header">Ideal Outcomes</span>
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="themes-outcome-row">
              <input
                type="checkbox"
                className="themes-outcome-checkbox"
                aria-label={`Mark outcome as done: ${outcome.text || 'Empty outcome'}`}
                checked={outcome.checked}
                onChange={(e) => updateOutcome(outcome.id, 'checked', e.target.checked)}
              />
              <div className="themes-outcome-input themes-content">
                <InputField
                  value={outcome.text}
                  onChange={(e) => updateOutcome(outcome.id, 'text', e.target.value)}
                  placeholder=" "
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="themes-add-outcome"
            onClick={addOutcome}
            aria-label="Add new ideal outcome"
          >
            Add outcome
          </button>
        </div>
      </section>
    </main>
  )
}
