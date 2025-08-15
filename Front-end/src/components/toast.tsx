import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: "success" | "error"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm ${
        type === "success" 
          ? "bg-green-50/95 border-green-200 text-green-800" 
          : "bg-red-50/95 border-red-200 text-red-800"
      }`}>
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-600" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
