import type { ChangeEventHandler } from 'react'
import './TextAreaField.css'

interface TextAreaFieldProps {
  ariaLabel: string
  className?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  value: string
}

export const TextAreaField = ({
  ariaLabel,
  className = '',
  onChange,
  placeholder,
  value,
}: TextAreaFieldProps) => {
  const classes = ['text-area-field', className].join(' ').trim()

  return (
    <textarea
      aria-label={ariaLabel}
      className={classes}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}
