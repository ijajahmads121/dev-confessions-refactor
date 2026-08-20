const express = require('express')
const {
  createConfessionController,
  deleteConfessionController,
  getConfessionController,
  listCategoryController,
  listConfessionsController,
} = require('../controllers/confessionController')

const router = express.Router()

router.post('/', createConfessionController)
router.get('/', listConfessionsController)
router.get('/category/:cat', listCategoryController)
router.get('/:id', getConfessionController)
router.delete('/:id', deleteConfessionController)

module.exports = router
