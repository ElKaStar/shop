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

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
})

app.get('/product/:uid', function(req, res){
    const uid = req.params.uid

    req.mayViewFilesFrom(uid, function(yes){
      if (yes) {
        res.sendFile((path.resolve(__dirname, 'static', uid)));
      } else {
        res.send(403, 'Sorry! you cant see that.');
      }
    });
  });



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server is started on port ${PORT} and ${process.env.IP}`))
    } catch (e) {
        console.log(e)
    }
}
start()
