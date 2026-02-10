/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

export type BubbleState = 'unfilled' | 'halfFilled' | 'filled'

export interface DailyAction {
  id: string
  label: string
  order: number
}

interface DailyActionsState {
  actions: DailyAction[]
  entries: Record<string, BubbleState>
  nextActionId: number
}

interface DailyActionsContextValue {
  actions: DailyAction[]
  visibleDateKeys: string[]
  addAction: (label: string) => void
  updateAction: (actionId: string, label: string) => void
  removeAction: (actionId: string) => void
  toggleEntry: (actionId: string, dateKey: string) => void
  getEntryState: (actionId: string, dateKey: string) => BubbleState
}

type DailyActionsAction =
  | { type: 'addAction'; label: string }
  | { type: 'updateAction'; actionId: string; label: string }
  | { type: 'removeAction'; actionId: string }
  | { type: 'toggleEntry'; actionId: string; dateKey: string }

const getEntryKey = (actionId: string, dateKey: string) => `${actionId}::${dateKey}`

const getNextBubbleState = (currentState: BubbleState): BubbleState => {
  if (currentState === 'unfilled') {
    return 'halfFilled'
  }

  if (currentState === 'halfFilled') {
    return 'filled'
  }

  return 'unfilled'
}

const createInitialActions = (): DailyAction[] => {
  const labels = [
    'Accomplished Something?',
    'Productive Day?',
    'Stay Focused?',
    'Work/Life Balance?',
    'Exercise?',
    'Learn Something?',
  ]

  return labels.map((label, index) => ({
    id: `action-${index + 1}`,
    label,
    order: index,
  }))
}

const initialState: DailyActionsState = {
  actions: createInitialActions(),
  entries: {},
  nextActionId: 7,
}

const dailyActionsReducer = (
  state: DailyActionsState,
  action: DailyActionsAction,
): DailyActionsState => {
  if (action.type === 'addAction') {
    const trimmedLabel = action.label.trim()

    if (trimmedLabel.length === 0) {
      return state
    }

    const nextAction: DailyAction = {
      id: `action-${state.nextActionId}`,
      label: trimmedLabel,
      order: state.actions.length,
    }

    return {
      ...state,
      actions: [...state.actions, nextAction],
      nextActionId: state.nextActionId + 1,
    }
  }

  if (action.type === 'updateAction') {
    const trimmedLabel = action.label.trim()

    if (trimmedLabel.length === 0) {
      return state
    }

    return {
      ...state,
      actions: state.actions.map((dailyAction) => {
        if (dailyAction.id !== action.actionId) {
          return dailyAction
        }

        return { ...dailyAction, label: trimmedLabel }
      }),
    }
  }

  if (action.type === 'removeAction') {
    const remainingActions = state.actions
      .filter((dailyAction) => dailyAction.id !== action.actionId)
      .map((dailyAction, index) => ({ ...dailyAction, order: index }))

    const filteredEntries: Record<string, BubbleState> = {}

    Object.entries(state.entries).forEach(([entryKey, bubbleState]) => {
      if (!entryKey.startsWith(`${action.actionId}::`)) {
        filteredEntries[entryKey] = bubbleState
      }
    })

    return {
      ...state,
      actions: remainingActions,
      entries: filteredEntries,
    }
  }

  const entryKey = getEntryKey(action.actionId, action.dateKey)
  const currentBubbleState = state.entries[entryKey] ?? 'unfilled'
  const nextBubbleState = getNextBubbleState(currentBubbleState)

  return {
    ...state,
    entries: {
      ...state.entries,
      [entryKey]: nextBubbleState,
    },
  }
}

const getDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getVisibleDateKeys = () => {
  const today = new Date()
  const keys: string[] = []

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)
    keys.push(getDateKey(date))
  }

  return keys
}

const DailyActionsContext = createContext<DailyActionsContextValue | undefined>(undefined)

interface DailyActionsProviderProps {
  children: ReactNode
}

export const DailyActionsProvider = ({ children }: DailyActionsProviderProps) => {
  const [state, dispatch] = useReducer(dailyActionsReducer, initialState)
  const visibleDateKeys = useMemo(() => getVisibleDateKeys(), [])

  const value = useMemo<DailyActionsContextValue>(
    () => ({
      actions: state.actions,
      visibleDateKeys,
      addAction: (label: string) => dispatch({ type: 'addAction', label }),
      updateAction: (actionId: string, label: string) =>
        dispatch({ type: 'updateAction', actionId, label }),
      removeAction: (actionId: string) => dispatch({ type: 'removeAction', actionId }),
      toggleEntry: (actionId: string, dateKey: string) =>
        dispatch({ type: 'toggleEntry', actionId, dateKey }),
      getEntryState: (actionId: string, dateKey: string) => {
        const entryKey = getEntryKey(actionId, dateKey)

        return state.entries[entryKey] ?? 'unfilled'
      },
    }),
    [state.actions, state.entries, visibleDateKeys],
  )

  return <DailyActionsContext.Provider value={value}>{children}</DailyActionsContext.Provider>
}

export const useDailyActions = () => {
  const context = useContext(DailyActionsContext)

  if (!context) {
    throw new Error('useDailyActions must be used within DailyActionsProvider')
  }

  return context
}
