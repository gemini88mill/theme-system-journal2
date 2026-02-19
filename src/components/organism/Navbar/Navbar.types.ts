export type NavbarView = 'journal' | 'daily-actions' | 'themes'

export interface NavbarProps {
  activeView: NavbarView
  onViewChange: (view: NavbarView) => void
}
