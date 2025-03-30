const {Router} = require("express")
const {LoginUser, registerNewUser} = require("../controllers/user")
const app = Router()

app.post('/login', LoginUser)
app.post('/register', registerNewUser)


module.exports= app;