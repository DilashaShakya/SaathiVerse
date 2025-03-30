
const {Router} = require("express")
const {getAllPosts, addNewPost} = require("../controllers/posts")
const router = Router()


router.get('/', getAllPosts)
router.post('/addNewPost', addNewPost)

module.exports = router;