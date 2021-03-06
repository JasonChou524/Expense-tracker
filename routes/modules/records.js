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
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Record.create({ name, date, amount, categoryId: category, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  Record.findOne({ _id: recordId, userId })
    .populate('categoryId')
    .lean()
    .then((record) => {
      record.date = record.date.toISOString().slice(0, 10)
      Category.find({ _id: { $ne: record.categoryId._id } })
        .lean()
        .sort({ _id: 'asc' })
        .then((categories) => {
          res.render('edit', { record, categories })
        })
    })
    .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  const { name, date, amount, category } = req.body

  return Record.findOne({ _id: recordId, userId })
    .then((record) => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = category
      return record.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.error(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id

  return Record.findOne({ _id: recordId, userId })
    .then((record) => {
      record.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.error(error))
})
module.exports = router
