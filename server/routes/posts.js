
const {Router} = require("express")
const {getAllPosts, addNewPost} = require("../controllers/posts")
const router = Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/posts' })

router.get('/posts', getAllPosts)
router.post('/posts',upload.single('image'), addNewPost)

module.exports = router;