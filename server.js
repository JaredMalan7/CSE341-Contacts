const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./db/database')
const port = process.env.PORT || 3000


app.use('/', require('./routes/users'))
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })


mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    }
})

