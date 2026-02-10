import type { ChangeEventHandler } from 'react'

interface InputFieldProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

export const InputField = ({ onChange, placeholder, value }: InputFieldProps) => {
  return (
    <input
      className="w-full rounded-sm border border-slate-400 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-blue-200"
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  )
}
