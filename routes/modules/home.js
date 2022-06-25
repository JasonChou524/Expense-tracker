const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categorySelectId = req.query.category
  let categorySelectName = '選擇類別'

  Category.find()
    .lean()
    .then((categories) => {
      categories.forEach((category) => {
        if (category._id.toString() === categorySelectId) {
          categorySelectName = category.name
        }
      })
      if (categorySelectName === '選擇類別') {
        Record.find({ userId })
          .populate('categoryId')
          .lean()
          .then((records) => {
            let totalAmount = 0
            records.forEach((record) => {
              record.date = record.date.toISOString().slice(0, 10)
              totalAmount += record.amount
            })
            res.render('index', {
              records,
              totalAmount,
              categories,
              categorySelectName,
            })
          })
      } else {
        Record.find({ userId, categoryId: categorySelectId })
          .populate('categoryId')
          .lean()
          .then((records) => {
            let totalAmount = 0
            records.forEach((record) => {
              record.date = record.date.toISOString().slice(0, 10)
              totalAmount += record.amount
            })
            res.render('index', {
              records,
              totalAmount,
              categories,
              categorySelectName,
            })
          })
      }
    })
    .catch((error) => console.error(error))
})

module.exports = router
