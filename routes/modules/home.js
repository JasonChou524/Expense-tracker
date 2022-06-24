const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then((records) => {
      records.forEach((record) => {
        record.date = record.date.toISOString().slice(0, 10)
      })
      res.render('index', { records })
    })
    .catch((error) => console.error(error))
})

module.exports = router
