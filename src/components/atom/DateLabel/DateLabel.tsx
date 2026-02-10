interface DateLabelProps {
  dateKey: string
}

const formatDateLabel = (dateKey: string) => {
  const [, month, day] = dateKey.split('-')

  return `${month}/${day}`
}

export const DateLabel = ({ dateKey }: DateLabelProps) => {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-slate-400 bg-slate-100 text-xs font-semibold text-slate-700">
      {formatDateLabel(dateKey)}
    </div>
  )
}
