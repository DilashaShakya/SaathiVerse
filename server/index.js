const express = require('express')
const app = express()
const port = 9000
const LoginRoute = require('./routes/user')
// const PostsRoute = require("./routes/posts");
const postRoutes = require('./routes/posts')

const dbConnect = require('./db/connection')

const cors = require('cors')
const multer = require('multer')
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



dbConnect()
// Configure multer storage (where to save files)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') //  Files will be saved in the 'uploads' folder in your project root
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
      // You can customize the filename here if needed
  }
})

const upload = multer({ storage: storage }) // Create multer instance with storage configuration
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads/' under '/uploads' URL
// Use multer middleware for your post route
app.use('/posts', postRoutes(upload)); // Pass 'upload' to your routes

// app.use('/',PostsRoute)
app.use('/',LoginRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})