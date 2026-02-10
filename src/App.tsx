import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button } from './components/atom/Button/Button.tsx'
import { Bubble } from './components/atom/Bubble/Bubble.tsx'
import { DateLabel } from './components/atom/DateLabel/DateLabel.tsx'
import { InputField } from './components/atom/InputField/InputField.tsx'
import { DailyActionsProvider, useDailyActions } from './providers/DailyActionsProvider.tsx'

const DailyActionsBoard = () => {
  const { actions, addAction, getEntryState, removeAction, toggleEntry, updateAction, visibleDateKeys } =
    useDailyActions()
  const [pendingActionLabel, setPendingActionLabel] = useState('')

  const handleAddAction = () => {
    addAction(pendingActionLabel)
    setPendingActionLabel('')
  }

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Daily Actions</h1>
            <p className="text-sm text-slate-600">Track your daily actions across the last 7 days.</p>
          </div>
          <div className="flex w-full gap-2 md:w-auto">
            <InputField
              onChange={(event) => setPendingActionLabel(event.target.value)}
              placeholder="Add a new daily action..."
              value={pendingActionLabel}
            />
            <Button onClick={handleAddAction} type="button" variant="secondary">
              <FontAwesomeIcon icon={faPlus} />
              <span className="sr-only">Add daily action</span>
            </Button>
          </div>
        </header>

        <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
          <div className="min-w-[760px]">
            <div className="mb-3 grid grid-cols-[260px_repeat(7,minmax(0,1fr))_52px] items-center gap-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Action</div>
              {visibleDateKeys.map((dateKey) => (
                <div className="flex justify-center" key={dateKey}>
                  <DateLabel dateKey={dateKey} />
                </div>
              ))}
              <div />
            </div>

            <div className="space-y-2">
              {actions.map((actionItem) => (
                <div
                  className="grid grid-cols-[260px_repeat(7,minmax(0,1fr))_52px] items-center gap-2"
                  key={actionItem.id}
                >
                  <InputField
                    onChange={(event) => updateAction(actionItem.id, event.target.value)}
                    value={actionItem.label}
                  />
                  {visibleDateKeys.map((dateKey) => (
                    <div className="flex justify-center" key={`${actionItem.id}-${dateKey}`}>
                      <Bubble
                        ariaLabel={`Set ${actionItem.label} for ${dateKey}`}
                        onToggle={() => toggleEntry(actionItem.id, dateKey)}
                        state={getEntryState(actionItem.id, dateKey)}
                      />
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <button
                      aria-label={`Delete ${actionItem.label}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border-0 bg-transparent p-0 text-slate-500 transition-colors hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={() => removeAction(actionItem.id)}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const App = () => {
  return (
    <DailyActionsProvider>
      <DailyActionsBoard />
    </DailyActionsProvider>
  )
}
