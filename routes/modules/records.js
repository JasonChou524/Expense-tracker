const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categorys) => {
      res.render('new', { categorys })
    })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const { name, date, amount, category } = req.body
  Record.create({ name, date, amount, categoryId: category }).then(() => {
    res.redirect('/')
  })
})

module.exports = router
