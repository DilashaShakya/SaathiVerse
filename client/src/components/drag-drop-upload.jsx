"use client"

import { addFiles, addPreviews } from "@/lib/redux/slice/postSlice"
import { CheckCheckIcon, CheckCircle2Icon } from "lucide-react"
import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useDispatch, useSelector } from "react-redux"

function DragDropUpload(props) {
const {previews} = useSelector(state=>state.post)
const dispatch = useDispatch()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file))
      dispatch(addPreviews(newPreviews))
      console.log("acceptedFiles[0] in DragDropUpload:", acceptedFiles[0]);
      console.log("Type of acceptedFiles[0]:", typeof acceptedFiles[0]);
      console.log("Value being passed to setFiles:", acceptedFiles[0]);
      debugger;
      props.setFiles(acceptedFiles[0])
    },
  })

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview))
    }
  }, [previews])

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="text-sm text-gray-600">
      {file.path} - {(file.size / 1024).toFixed(2)} KB
    </li>
  ))

  return (
    <section className="container ">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="border-2 p-6 m-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors">
          <p className="text-gray-500">Drag &apos;n&apos; drop some files here, or click to select files</p>
        </div>
      </div>

      <aside className="mt-4">
        {previews.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {previews.map((previewUrl, index) => (
                <img
                  key={index}
                  src={previewUrl || "/placeholder.svg"}
                  width={100}
                  height={100}
                  className="object-cover rounded border border-gray-200"
                  alt={`Preview ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </aside>

    </section>
  )
}

export default DragDropUpload

