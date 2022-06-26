const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')
const data = require('./recordData.json').data

const SEED_USER = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678',
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    // create record data
    .then((user) => {
      console.log(data)
      return Promise.all(
        Array.from(data, (record) => {
          return Category.findOne({ name: record.category })
            .lean()
            .then((category) => {
              return Record.create({
                name: record.name,
                date: record.date,
                amount: record.amount,
                userId: user._id,
                categoryId: category._id,
              })
            })
        })
      )
    })
    .then(() => {
      console.log('RecordSeeder done!')
      process.exit()
    })
    .catch((error) => console.error(error))
})
