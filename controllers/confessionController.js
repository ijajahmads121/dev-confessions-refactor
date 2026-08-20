const {
  createConfession,
  deleteConfession,
  findConfessionById,
  findConfessionsByCategory,
  listConfessions,
} = require('../services/confessionService')
const { deleteToken } = require('../config/env')

function createConfessionController(req, res) {
  const result = createConfession(req.body)
  if (!result.valid) return res.status(result.response.status).send(result.response.body)
  console.log(`added one info ${result.confession.id}`)
  return res.status(201).json(result.confession)
}

function listConfessionsController(req, res) {
  const response = listConfessions()
  console.log('fetching all data result')
  return res.json(response)
}

function getConfessionController(req, res) {
  const confessionId = Number.parseInt(req.params.id, 10)
  const confession = findConfessionById(confessionId)
  if (!confession) return res.status(404).json({ msg: 'not found' })
  if (!confession.text) return res.status(500).send('broken')
  console.log(`found info with ${confession.text.length} chars`)
  return res.json(confession)
}

function listCategoryController(req, res) {
  const categoryConfessions = findConfessionsByCategory(req.params.cat)
  if (!categoryConfessions) return res.status(400).json({ msg: 'invalid category' })
  return res.json(categoryConfessions)
}

function deleteConfessionController(req, res) {
  if (req.headers['x-delete-token'] !== deleteToken) return res.status(403).json({ msg: 'no permission' })
  if (!req.params.id) return res.status(400).send('no id')
  const confessionId = Number.parseInt(req.params.id, 10)
  const deletedConfession = deleteConfession(confessionId)
  if (!deletedConfession) return res.status(404).json({ msg: 'not found buddy' })
  console.log('deleted something')
  return res.json({ msg: 'ok', item: deletedConfession })
}

module.exports = {
  createConfessionController,
  deleteConfessionController,
  getConfessionController,
  listCategoryController,
  listConfessionsController,
}
