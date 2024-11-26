import React from 'react'
import { X } from "lucide-react"
export default function Reject() {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-red-100 px-3 py-1.5 text-sm text-red-900">
      <X className="h-3.5 w-3.5" />
      <span>Rejected</span>
    </div>
  )
}
