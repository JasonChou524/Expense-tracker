const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const { render } = require('express/lib/response')

router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then((records) => {
      console.log(records)
      res.render('index', { records })
    })
    .catch((err) => console.error(err))
})

module.exports = router
