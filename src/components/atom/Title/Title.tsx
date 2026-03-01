import type { ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
}

export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-2xl font-bold text-white md:text-3xl">{children}</h1>
}
