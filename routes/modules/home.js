const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then((records) => {
      res.render('index', { records })
    })
    .catch((err) => console.error(err))
})

module.exports = router
