const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const app = express()

require('dotenv').config()
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(3000, () => {
  console.log(`Express is listening on http://localhost:3000`)
})
