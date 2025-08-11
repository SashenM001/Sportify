import { AlertCircle } from 'lucide-react'

interface FieldErrorProps {
  error?: string
  className?: string
}

export function FieldError({ error, className = "" }: FieldErrorProps) {
  if (!error) return null

  return (
    <div className={`flex items-center gap-1 text-red-600 text-xs mt-1 animate-in slide-in-from-left-1 duration-200 ${className}`}>
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      <span>{error}</span>
    </div>
  )
}
