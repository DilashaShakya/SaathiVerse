const express = require('express')
const app = express()
const port = 9000
const LoginRoute = require('./routes/user')
const PostsRoute = require("./routes/posts");
console.log("🚀 PostsRoute:", PostsRoute);

const dbConnect = require('./db/connection')

const cors = require('cors')
require('dotenv').config()

app.use(cors());
app.use(express.json());



dbConnect()
console.log("🚀 LoginRoute:", LoginRoute);
console.log("🚀 PostsRoute:", PostsRoute);

app.use('/posts',PostsRoute)
app.use('/user',LoginRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})