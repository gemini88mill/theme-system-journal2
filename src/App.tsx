import { useState } from 'react'
import { Navbar } from './components/organism/Navbar/Navbar.tsx'
import type { NavbarView } from './components/organism/Navbar/Navbar.types.ts'
import { Journal } from './components/organism/Journal/Journal.tsx'
import { DailyActions } from './components/organism/DailyActions/DailyActions.tsx'
import { DailyActionsProvider } from './providers/DailyActionsProvider.tsx'

export const App = () => {
  const [activeView, setActiveView] = useState<NavbarView>('journal')

  return (
    <>
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'journal' && <Journal />}
      {activeView === 'daily-actions' && (
        <DailyActionsProvider>
          <DailyActions />
        </DailyActionsProvider>
      )}
    </>
  )
}
