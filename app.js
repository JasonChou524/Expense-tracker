const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

require('dotenv').config()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbss' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log(`Express is listening on http://localhost:3000`)
})
