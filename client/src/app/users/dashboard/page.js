"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Camera, Smile, Music, Bold, Italic, Underline } from "lucide-react"
import { useCallback, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import axios from "axios"

const Dashboard = () => {
  const [isEditorActive, setIsEditorActive] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Placeholder.configure({
        placeholder: "What's in your mind, pal?",
      }),
    ],
    content: "",
    autofocus: false,
  })

  const handleSubmit = useCallback(async () => {
    const html = editor?.getHTML()
    if (!html || html === "<p></p>") return

    await axios.post("http://localhost:9000/posts/addNewPost", {
      content: html,
      postType: "text",
      createdBy: "userObjectIdHere", 
    })

    editor?.commands.clearContent()
    setIsEditorActive(false)
  }, [editor])

  const activateEditor = useCallback(() => {
    setIsEditorActive(true)
    // Focus the editor after a short delay to ensure the DOM has updated
    setTimeout(() => {
      editor?.commands.focus()
    }, 10)
  }, [editor])

  return (
    <div className="p-6 font-[poppins]">
      {/* Top card */}
      <Card className="flex items-center bg-white rounded-2xl shadow-sm p-6 border border-gray-200 gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">Welcome to your dashboard!</h1>
          <p className="text-sm text-gray-500 mt-2">
            Hello,
            <br />
            Namaste!
          </p>
        </div>
        <Image src="/dashboardpenguin.png" width={60} height={60} alt="Dashboard Penguin" />
      </Card>

      {/* Post input card */}
      <Card className="bg-white rounded-2xl p-4 shadow-sm mt-6 border border-[#f6e9e0]">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">
            😊
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Dilasha</h3>
        </div>

        {/* Toolbar - only show when editor is active */}
        {isEditorActive && editor && (
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="text-gray-500 hover:text-black"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="text-gray-500 hover:text-black"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="text-gray-500 hover:text-black"
            >
              <Underline size={18} />
            </button>
          </div>
        )}

        {/* Editor area */}
        <div className="border-dashed border-[#e6d7ce] rounded-xl bg-[#fff8f1] px-4 py-2 text-gray-800 min-h-[80px] border">
          {isEditorActive ? (
            <EditorContent
              editor={editor}
              className="prose prose-sm max-w-none font-[poppins] focus:outline-none break-words whitespace-normal w-full overflow-hidden"
            />
          ) : (
            <div onClick={activateEditor} className="text-gray-500 cursor-text min-h-[60px] flex items-center">
              What's in your mind, pal?
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button className="flex items-center gap-1 rounded-xl px-3 py-2 border border-[#f6e9e0] bg-white text-sm text-gray-700">
            <Camera size={16} className="text-pink-500" /> Photo
          </button>
          <button className="flex items-center gap-1 rounded-xl px-3 py-2 border border-[#f6e9e0] bg-white text-sm text-gray-700">
            <Smile size={16} className="text-yellow-500" /> Feeling
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1 rounded-xl px-3 py-2 bg-pink-200 text-sm text-pink-800"
          >
             Post
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard

