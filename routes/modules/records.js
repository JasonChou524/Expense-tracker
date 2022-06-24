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
  const { name, date, amount, category } = req.body
  Record.create({ name, date, amount, categoryId: category }).then(() => {
    res.redirect('/')
  })
})

router.get('/:id/edit', (req, res) => {
  const recordId = req.params.id
  Record.findOne({ _id: recordId })
    .populate('categoryId')
    .lean()
    .then((record) => {
      record.date = record.date.toISOString().slice(0, 10)
      Category.find({ _id: { $ne: record.categoryId._id } })
        .lean()
        .sort({ _id: 'asc' })
        .then((categories) => {
          console.log(record, categories)
          res.render('edit', { record, categories })
        })
    })
    .catch((error) => console.error(error))
})

module.exports = router
