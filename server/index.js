const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/buzzieDb');


const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type:String, unique:true}, // String is shorthand for {type: String}
  password: String,
  fullName: String,
});
const dbConnect = async()=>{
  try{
    const isConnected = await mongoose.connect('mongodb://127.0.0.1:27017/buzzieDb');
    if (isConnected) console.log("connected to mongodb")
  }
catch(err){
  console.log(err)
}
  
}
dbConnect()
const User = mongoose.model('User', userSchema);
app.use(express.json())
app.use(cors())



app.post('/register', async(req, res)=>{
  //1.user exists or not?
  const emailExist = User.exists({email: req.body.email})
  req.body.password = bcrypt.hash(req.body.password, saltRounds)
  console.log(req.body)

    //yes exists
    //hash password

    //3. save to db
    User.create(req.body)
    res.send({msg: req.body.role})
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  User.create(req.body)
  res.send('ok')
})

app.get('/users', (req, res) => {
    res.send(['Ram', 'Shyam'])
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})