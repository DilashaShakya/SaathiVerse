
const {Router} = require("express")
const {getAllPosts, addNewPost, deletePost, toggleLike, addReaction, addComment} = require("../controllers/posts")
const router = Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/posts' })

router.get('/posts', getAllPosts)
router.post('/posts', upload.single('image'), addNewPost)
router.delete('/posts/:id/:userId', deletePost)
router.patch('/posts/:id/like', toggleLike)
router.patch('/posts/:id/react', addReaction)
router.post('/posts/:id/comment', addComment)

module.exports = router;