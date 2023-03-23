require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const app = express()
const port = process.env.APP_PORT
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap');
const registerRoute = require('./routes/customer.route')
const authRoute = require('./routes/auth.route')
const bankUserRoute = require('./routes/bankuser.route')

app.use(cors())
app.use(bodyParser.json())
app.use(registerRoute)
app.use(authRoute)
app.use(bankUserRoute)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})


displayRoutes(app)