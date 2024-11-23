import React from 'react'
import { Loader } from "lucide-react"

export default function Pending() {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-orange-100 px-3 py-1.5 text-sm text-orange-900">
      <Loader className="h-3.5 w-3.5 " />
      <span>Pending</span>
    </div>
  )
}
{/* <Loader /> */}