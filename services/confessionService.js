const allowedCategories = ['bug', 'deadline', 'imposter', 'vibe-code']
const confessions = []
let nextConfessionId = 0

function validateConfessionInput(confessionData) {
  if (!confessionData) return { valid: false, response: { status: 400, body: { msg: 'bad' } } }
  if (!confessionData.text) return { valid: false, response: { status: 400, body: { msg: 'need text' } } }
  if (confessionData.text.length >= 500) {
    return { valid: false, response: { status: 400, body: { error: 'text too big, must be less than 500 characters long buddy' } } }
  }
  if (confessionData.text.length === 0) return { valid: false, response: { status: 400, body: 'too short' } }
  if (!allowedCategories.includes(confessionData.category)) {
    return { valid: false, response: { status: 400, body: 'category not in stuff' } }
  }
  return { valid: true }
}

function saveConfession(confessionData) {
  const savedConfession = {
    id: ++nextConfessionId,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date(),
  }
  confessions.push(savedConfession)
  return savedConfession
}

function formatConfessionResponse(confession) {
  return { ...confession }
}

function createConfession(confessionData) {
  const validation = validateConfessionInput(confessionData)
  if (!validation.valid) return validation
  return { valid: true, confession: formatConfessionResponse(saveConfession(confessionData)) }
}

function listConfessions() {
  // Newest-first ordering keeps the feed useful without mutating the stored collection.
  const sortedConfessions = [...confessions].sort((first, second) => second.created_at - first.created_at)
  return { data: sortedConfessions.map(formatConfessionResponse), count: sortedConfessions.length }
}

function findConfessionById(confessionId) {
  return confessions.find((confession) => confession.id === confessionId)
}

function findConfessionsByCategory(category) {
  if (!allowedCategories.includes(category)) return null
  // Reverse a copy so category reads never change the order of the main feed.
  return confessions.filter((confession) => confession.category === category).reverse().map(formatConfessionResponse)
}

function deleteConfession(confessionId) {
  const confessionIndex = confessions.findIndex((confession) => confession.id === confessionId)
  if (confessionIndex === -1) return null
  const [deletedConfession] = confessions.splice(confessionIndex, 1)
  return formatConfessionResponse(deletedConfession)
}

module.exports = {
  allowedCategories,
  createConfession,
  deleteConfession,
  findConfessionById,
  findConfessionsByCategory,
  listConfessions,
}
