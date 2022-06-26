if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const data = require('./categoryData.json').data

const createData = (category) => {
  return Category.create({
    name: category.name,
    icon: category.icon,
  })
}

const createCategory = data.map(createData)

db.once('open', () => {
  return Promise.all(createCategory)
    .then(() => {
      console.log('CategorySeeder done!')
      process.exit()
    })
    .catch((err) => console.error(err))
})
