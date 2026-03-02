import type { ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
  subtitle?: string
}

export const Title = ({ children, subtitle }: TitleProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white md:text-3xl">{children}</h1>
      {subtitle != null && subtitle !== '' && (
        <p className="text-sm text-slate-400">{subtitle}</p>
      )}
    </div>
  )
}
