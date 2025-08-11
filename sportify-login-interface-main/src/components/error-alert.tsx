import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorAlertProps {
  error: string
  onClose?: () => void
  variant?: "destructive" | "warning"
}

export function ErrorAlert({ error, onClose, variant = "destructive" }: ErrorAlertProps) {
  if (!error) return null

  return (
    <Alert className={`animate-in slide-in-from-top-2 duration-300 ${
      variant === "destructive" 
        ? "border-red-200 bg-red-50 text-red-800" 
        : "border-amber-200 bg-amber-50 text-amber-800"
    }`}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm font-medium">{error}</span>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
