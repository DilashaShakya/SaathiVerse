"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Camera, Smile, Music, Bold, Italic, Underline, CheckCircleIcon, CheckCircle2Icon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import axios from "axios"
import { useSelector } from "react-redux"
import DragDropUpload from "@/components/drag-drop-upload"

const Dashboard = () => {
  const [isEditorActive, setIsEditorActive] = useState(false)
  const {userDetails} = useSelector(state=>state.user)
  const {uploadedFiles} = useSelector(state=>state.post)
  const [files, setFiles] = useState([])
  const [post, setPosts] = useState([])
  const [showReactionsFor, setShowReactionsFor] = useState(null)
  const [uploadModelOpen,setUploadModelOpen] = useState(false)
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
    try {
        console.log("--- fetchPosts function called ---"); // Log when fetchPosts starts
        const { data } = await axios.get(`http://localhost:9000/posts`);
        console.log("✅ fetchPosts Axios GET request successful"); // Log on successful GET
        console.log("Data received from backend:", data); // Log the entire 'data' received
        setPosts(data);
        console.log("Posts state updated with fetched data:", data); // Log after setPosts
    } catch (error) {
        console.error("❌ Error fetching posts:", error); // Log any errors
    }
}

  useEffect(()=>{
    fetchPosts()
  },[])
  useEffect(() => {
    console.log("Dashboard files state updated:", files); // ADDED
  }, [files]);

  const handleSubmit = useCallback(async () => {
    const html = editor?.getHTML();
    if (!html || html === "<p></p>") return;
  
    const formData = new FormData();
    formData.append('image', files);
    formData.append('content', html);
    formData.append('createdBy', userDetails?._id);
  
    debugger; // Keep debugger for inspection
    await axios.post("http://localhost:9000/posts", formData);
    // (Remove fetchPosts(), clearContent(), setIsEditorActive() for now)
    fetchPosts(); // Fetch posts again to update the list
   
  }, [editor, files, userDetails]);
  
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
          <h1 className="text-4xl font-semibold text-gray-900">Welcome to your Homepage!</h1>
          <p className="text-sm text-gray-500 mt-2">
            Hello, {userDetails?.fullName}
            <br />
            Namaste!
          </p>
        </div>
        <Image src="/dashboardpenguin.png" width={60} height={60} alt="Dashboard Penguin" />
      </Card>
{JSON.stringify(post)}
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
     {uploadModelOpen &&   <DragDropUpload setFiles={setFiles} files={files}/>}
        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button onClick={()=>setUploadModelOpen(true)}  className="flex items-center gap-1 rounded-xl px-3 py-2 border border-[#f6e9e0] bg-white text-sm text-gray-700">
            <Camera  size={16} className="text-pink-500" /> Photo
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
      {/* Penguin reactions */}


{post.map((item) => (
  <div
    key={item._id}
    className="bg-white rounded-2xl shadow-sm border border-[#f6e9e0] p-4 mt-4 font-[poppins]"
  >
    {/* Top: User Info */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">
        😊
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{userDetails.fullName}</p>
        <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
      </div>
    </div>

    {/* Post Content */}
    <div
      className="prose prose-sm max-w-none text-gray-800 mb-4 break-words"
      dangerouslySetInnerHTML={{ __html: item.content }}
    />
    {item.image && ( // Conditionally render image if post.image exists
  <Image
  src={`http://localhost:9000/${item.image.replace(/\\/g, '/')}`}
  alt="Post Image"
  width={300}
  height={200}
  className="rounded-lg mt-2 object-cover"
/>
)}

    {/* Bottom buttons */}
    <div className="flex gap-4 text-gray-500 text-sm items-center">
      <button className="hover:text-pink-500">❤️ Like</button>
      <button className="hover:text-yellow-500">💬 Comment</button>
      <button
        className="hover:text-blue-500"
        onClick={() => setShowReactionsFor((prev) => (prev === item._id ? null : item._id))}
      >
        🐧 React
      </button>
    </div>

    {/* Penguin Reactions */}
    {showReactionsFor === item._id && (
      <div className="flex gap-3 mt-2">
      <button className="hover:scale-110 transition-transform">
        <Image src="/love.png" alt="love" width={80} height={100} />
      </button>
      <button className="hover:scale-110 transition-transform">
        <Image src="/cool.png" alt="cool" width={80} height={100}  />
      </button>
      <button className="hover:scale-110 transition-transform">
        <Image src="/no.png" alt="no" width={80} height={100}  />
      </button>
      <button className="hover:scale-110 transition-transform">
        <Image src="/sad.png" alt="sad" width={80} height={100}  />
      </button>
      <button className="hover:scale-110 transition-transform">
        <Image src="/celebrate.png" alt="celebrate" width={80} height={100}  />
      </button>
    </div>
    )}
  </div>
))}


    </div>
  )
}

export default Dashboard

