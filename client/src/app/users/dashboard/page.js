"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Camera, Smile, Music, Bold, Italic, Underline, CheckCircleIcon, CheckCircle2Icon, Trash2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { addUserDetails } from "@/lib/redux/slice/userSlice"
import { clearPreviews } from "@/lib/redux/slice/postSlice"
import { toast } from "sonner"
import DragDropUpload from "@/components/drag-drop-upload"

const FEELINGS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '🎉', label: 'Excited' },
  { emoji: '😍', label: 'Loved' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '🙏', label: 'Blessed' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤗', label: 'Grateful' },
  { emoji: '😎', label: 'Cool' },
  { emoji: '🤔', label: 'Thoughtful' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '🥳', label: 'Celebratory' },
]

const Dashboard = () => {
  const [isEditorActive, setIsEditorActive] = useState(false)
  const dispatch = useDispatch()
  const {userDetails} = useSelector(state=>state.user)
  const {uploadedFiles} = useSelector(state=>state.post)
  const [files, setFiles] = useState([])
  const [post, setPosts] = useState([])
  const [showReactionsFor, setShowReactionsFor] = useState(null)
  const [showCommentsFor, setShowCommentsFor] = useState(null)
  const [commentText, setCommentText] = useState({})
  const [uploadModelOpen,setUploadModelOpen] = useState(false)
  const [showFeelingPicker, setShowFeelingPicker] = useState(false)
  const [selectedFeeling, setSelectedFeeling] = useState(null)
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

  const fetchPosts= async ()=>{
    const {data}= await axios.get(`http://localhost:8000/posts`)
    setPosts(data)
  }

  useEffect(() => {
    const saved = localStorage.getItem("user")
    if (saved && !userDetails?._id) {
      dispatch(addUserDetails(JSON.parse(saved)))
    }
  }, [])
  useEffect(()=>{
    fetchPosts()
  },[])

  const handleSubmit = useCallback(async () => {
    const html = editor?.getHTML()
    const hasText = html && html !== "<p></p>"
    const hasImage = files?.size > 0
    if (!hasText && !hasImage && !selectedFeeling) return
    if (!userDetails?._id) {
      console.error("Cannot post: user not logged in. userDetails =", userDetails)
      return
    }

    const feeling = selectedFeeling
      ? `<p class="feeling-tag" style="color:#e87b8c;font-size:0.85rem;margin-top:4px">— feeling ${selectedFeeling.emoji} ${selectedFeeling.label}</p>`
      : ''

    const formData = new FormData()
    formData.append('image', files)
    formData.append('content', html + feeling)
    formData.append('createdBy', userDetails._id)
    await axios.post("http://localhost:8000/posts", formData)
    await fetchPosts();

    editor?.commands.clearContent()
    setIsEditorActive(false)
    setFiles([])
    setUploadModelOpen(false)
    setSelectedFeeling(null)
    setShowFeelingPicker(false)
    dispatch(clearPreviews())
    toast.success("Posted!")
  }, [editor, files, userDetails, selectedFeeling])

  const activateEditor = useCallback(() => {
    setIsEditorActive(true)
    setTimeout(() => {
      editor?.commands.focus()
    }, 10)
  }, [editor])

  const handleLike = async (postId) => {
    await axios.patch(`http://localhost:8000/posts/${postId}/like`, { userId: userDetails._id })
    fetchPosts()
  }

  const handleReact = async (postId, type) => {
    await axios.patch(`http://localhost:8000/posts/${postId}/react`, { userId: userDetails._id, type })
    setShowReactionsFor(null)
    fetchPosts()
  }

  const handleComment = async (postId) => {
    const comment = commentText[postId]
    if (!comment?.trim()) return
    await axios.post(`http://localhost:8000/posts/${postId}/comment`, { userId: userDetails._id, comment })
    setCommentText(prev => ({ ...prev, [postId]: '' }))
    fetchPosts()
  }

  const handleDelete = async (postId) => {
    await axios.delete(`http://localhost:8000/posts/${postId}/${userDetails._id}`)
    fetchPosts()
    toast.success("Post deleted")
  }

  return (
    <div className="p-6 font-[poppins]">
      {/* Top card */}
      <Card className="flex items-center bg-white rounded-2xl shadow-sm p-6 border border-gray-200 gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">Welcome to your Homepage!</h1>
          <p className="text-sm text-gray-500 mt-2">
            Hello, {userDetails?.fullName}
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
          <h3 className="text-lg font-semibold text-gray-800">{userDetails?.fullName}</h3>
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
      {uploadModelOpen && <DragDropUpload setFiles={setFiles} files={files}/>}

      {/* Selected feeling badge */}
      {selectedFeeling && (
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 bg-pink-50 border border-pink-200 text-pink-700 text-sm rounded-full px-3 py-1">
            {selectedFeeling.emoji} feeling {selectedFeeling.label}
          </span>
          <button onClick={() => setSelectedFeeling(null)} className="text-gray-400 hover:text-red-400 text-xs">✕ remove</button>
        </div>
      )}

      {/* Feeling picker panel */}
      {showFeelingPicker && (
        <div className="mt-2 p-3 border border-[#f6e9e0] rounded-xl bg-white shadow-sm">
          <p className="text-xs text-gray-400 mb-2">How are you feeling?</p>
          <div className="grid grid-cols-4 gap-2">
            {FEELINGS.map(f => (
              <button
                key={f.label}
                onClick={() => { setSelectedFeeling(f); setShowFeelingPicker(false) }}
                className={`flex flex-col items-center p-2 rounded-lg text-xs hover:bg-pink-50 transition-colors ${selectedFeeling?.label === f.label ? 'bg-pink-100 border border-pink-300' : ''}`}
              >
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-gray-600 mt-1">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button onClick={()=>setUploadModelOpen(true)} className="flex items-center gap-1 rounded-xl px-3 py-2 border border-[#f6e9e0] bg-white text-sm text-gray-700">
            <Camera size={16} className="text-pink-500" /> Photo
          </button>
          <button
            onClick={() => setShowFeelingPicker(prev => !prev)}
            className={`flex items-center gap-1 rounded-xl px-3 py-2 border text-sm ${showFeelingPicker || selectedFeeling ? 'border-pink-300 bg-pink-50 text-pink-700' : 'border-[#f6e9e0] bg-white text-gray-700'}`}
          >
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
      {/* Penguin reactions */}


{post.map((item) => (
  <div
    key={item._id}
    className="bg-white rounded-2xl shadow-sm border border-[#f6e9e0] p-4 mt-4 font-[poppins]"
  >
    {/* Top: User Info */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">
          😊
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{item.createdBy?.fullName || 'User'}</p>
          <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
        </div>
      </div>
      {item.createdBy?._id === userDetails._id && (
        <button
          onClick={() => handleDelete(item._id)}
          className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
          title="Delete post"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>

    {/* Post Content */}
    <div
      className="prose prose-sm max-w-none text-gray-800 mb-4 break-words"
      dangerouslySetInnerHTML={{ __html: item.content }}
    />

    {/* Post Image */}
    {item.image && (
      <img
        src={`http://localhost:8000/${item.image}`}
        alt="post"
        className="rounded-xl max-w-full mb-4 border border-[#f6e9e0]"
      />
    )}

    {/* Bottom buttons */}
    <div className="flex gap-4 text-gray-500 text-sm items-center">
      <button
        onClick={() => handleLike(item._id)}
        className={`hover:text-pink-500 transition-colors ${item.likes?.includes(userDetails._id) ? 'text-pink-500 font-semibold' : ''}`}
      >
        ❤️ Like {item.likes?.length > 0 && `(${item.likes.length})`}
      </button>
      <button
        onClick={() => setShowCommentsFor(prev => prev === item._id ? null : item._id)}
        className="hover:text-yellow-500"
      >
        💬 Comment {item.comments?.length > 0 && `(${item.comments.length})`}
      </button>
      <button
        className={`hover:text-blue-500 ${item.reactions?.some(r => r.user === userDetails._id) ? 'text-blue-500' : ''}`}
        onClick={() => setShowReactionsFor((prev) => (prev === item._id ? null : item._id))}
      >
        🐧 React {item.reactions?.length > 0 && `(${item.reactions.length})`}
      </button>
    </div>

    {/* Reaction Summary — shows icons + counts for any reactions that exist */}
    {item.reactions?.length > 0 && (() => {
      const userReaction = item.reactions.find(r => r.user === userDetails._id)?.type
      const counts = ['love', 'cool', 'no', 'sad', 'celebrate']
        .map(type => ({ type, count: item.reactions.filter(r => r.type === type).length }))
        .filter(r => r.count > 0)
      return (
        <div className="flex gap-2 mt-2 flex-wrap">
          {counts.map(({ type, count }) => (
            <div
              key={type}
              className={`flex items-center gap-1 rounded-full px-2 py-1 border text-xs text-gray-600 ${userReaction === type ? 'border-pink-400 bg-pink-50' : 'border-[#f6e9e0] bg-[#fff8f1]'}`}
            >
              <Image src={`/${type}.png`} alt={type} width={28} height={35} />
              <span>{count}</span>
            </div>
          ))}
        </div>
      )
    })()}

    {/* Penguin Reaction Picker */}
    {showReactionsFor === item._id && (
      <div className="flex gap-3 mt-2">
        <button onClick={() => handleReact(item._id, 'love')} className="hover:scale-110 transition-transform">
          <Image src="/love.png" alt="love" width={80} height={100} />
        </button>
        <button onClick={() => handleReact(item._id, 'cool')} className="hover:scale-110 transition-transform">
          <Image src="/cool.png" alt="cool" width={80} height={100} />
        </button>
        <button onClick={() => handleReact(item._id, 'no')} className="hover:scale-110 transition-transform">
          <Image src="/no.png" alt="no" width={80} height={100} />
        </button>
        <button onClick={() => handleReact(item._id, 'sad')} className="hover:scale-110 transition-transform">
          <Image src="/sad.png" alt="sad" width={80} height={100} />
        </button>
        <button onClick={() => handleReact(item._id, 'celebrate')} className="hover:scale-110 transition-transform">
          <Image src="/celebrate.png" alt="celebrate" width={80} height={100} />
        </button>
      </div>
    )}

    {/* Comments Section */}
    {showCommentsFor === item._id && (
      <div className="mt-3 border-t border-[#f6e9e0] pt-3">
        {item.comments?.map((c, i) => (
          <div key={i} className="text-sm text-gray-700 mb-2 bg-[#fff8f1] rounded-lg px-3 py-1">
            <span className="font-semibold text-gray-800">@user: </span>{c.comment}
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={commentText[item._id] || ''}
            onChange={e => setCommentText(prev => ({ ...prev, [item._id]: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleComment(item._id)}
            placeholder="Write a comment..."
            className="flex-1 text-sm border border-[#f6e9e0] rounded-lg px-3 py-1 outline-none focus:border-pink-300 bg-white"
          />
          <button
            onClick={() => handleComment(item._id)}
            className="text-sm bg-pink-200 text-pink-800 px-3 py-1 rounded-lg hover:bg-pink-300"
          >
            Send
          </button>
        </div>
      </div>
    )}
  </div>
))}


    </div>
  )
}

export default Dashboard

