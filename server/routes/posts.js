
const {Router} = require("express")
const {getAllPosts, addNewPost} = require("../controllers/posts")
const router = Router()


router.get('/posts', getAllPosts)
router.post('/posts', addNewPost)

module.exports = router;