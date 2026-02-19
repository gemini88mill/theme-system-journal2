import type { NavbarProps, NavbarView } from './Navbar.types.ts'

const VIEW_OPTIONS: { view: NavbarView; label: string }[] = [
  { view: 'journal', label: 'Journal' },
  { view: 'daily-actions', label: 'Daily Actions' },
]

export const Navbar = ({ activeView, onViewChange }: NavbarProps) => {
  return (
    <nav
      className="flex items-center gap-1 border-b border-slate-700 bg-slate-800 px-4 py-3"
      role="navigation"
    >
      {VIEW_OPTIONS.map(({ view, label }) => (
        <button
          key={view}
          type="button"
          role="tab"
          aria-selected={activeView === view}
          aria-label={`Switch to ${label}`}
          className={`rounded px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
            activeView === view
              ? 'bg-slate-600 text-white'
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onClick={() => onViewChange(view)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
