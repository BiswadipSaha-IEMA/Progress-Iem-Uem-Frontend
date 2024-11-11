import React from 'react'
import { Check } from "lucide-react"

function Accept() {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-green-100 px-3 py-1.5 text-sm text-green-900">
    <Check className="h-3.5 w-3.5" />
    <span>Published</span>
  </div>
  )
}

export default Accept