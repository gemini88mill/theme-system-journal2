export type NavbarView = 'journal' | 'daily-actions'

export interface NavbarProps {
  activeView: NavbarView
  onViewChange: (view: NavbarView) => void
}
