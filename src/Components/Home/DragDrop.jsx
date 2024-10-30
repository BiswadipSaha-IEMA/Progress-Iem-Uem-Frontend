
import React, { useState, useRef } from 'react'
import { Upload, FileUp } from 'lucide-react'

export default function DragDrop() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => 
      ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)
    )
    setFiles(prevFiles => [...prevFiles, ...validFiles])
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full bg-blue-50 max-w-md mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <Upload className="mx-auto h-12 w-12 text-[#03A8FD]" />
        <p className="mt-2 text-sm font-medium text-gray-900">
          Drag & drop files or <span className='text-[#03A8FD] underline'>Browse </span> 
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: JPEG, PNG, SVG
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        multiple
        accept=".jpg,.jpeg,.png,.svg"
        className="hidden"
      />
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Uploaded files:</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            {files.map((file, index) => (
              <li key={index} className="py-2 flex items-center">
                <FileUp className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}