if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')
const category = require('../category')

db.once('open', () => {
  Category.findOne({ name: '其他' })
    .then((category) => {
      return Record.create({
        name: 'test',
        date: Date.now(),
        amount: 1000,
        categoryId: category._id,
      })
    })
    .then(() => {
      console.log('Record done')
      process.exit()
    })
    .catch((err) => console.error(err))
})
