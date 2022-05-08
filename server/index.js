require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

app.use(errorHandlingMiddleware)


const start  = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}
start()
