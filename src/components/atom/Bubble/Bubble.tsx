import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import type { BubbleState } from '../../../providers/DailyActionsProvider.tsx'

interface BubbleProps {
  state: BubbleState
  onToggle: () => void
  ariaLabel: string
}

const iconClassMap: Record<BubbleState, string> = {
  filled: 'text-slate-700',
  halfFilled: 'text-slate-700',
  unfilled: 'text-slate-300',
}

export const Bubble = ({ ariaLabel, onToggle, state }: BubbleProps) => {
  const icon = state === 'halfFilled' ? faCircleHalfStroke : faCircle

  return (
    <button
      aria-label={ariaLabel}
      className="inline-flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={onToggle}
      type="button"
    >
      <FontAwesomeIcon className={`text-[1.35rem] ${iconClassMap[state]}`} icon={icon} />
    </button>
  )
}
