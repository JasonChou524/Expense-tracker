if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const data = require('../../category.json').data

const createData = (category) => {
  return Category.create({
    name: category.name,
    icon: category.icon,
  })
}

const actions = data.map(createData)

db.once('open', () => {
  return Promise.all(actions)
    .then(() => {
      console.log('Category done')
      process.exit()
    })
    .catch((err) => console.error(err))
})
