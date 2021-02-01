const express = require('express')
const { questDatabase } = require('./questDatabase')
const { authenticateUser } = require('./auth')

const PORT = 8080
const HOST = '0.0.0.0'
const app = express()

app.use(authenticateUser)
app.use(express.json())

app.get('/quests/available', (req, res) => {
  res.json({
    list: questDatabase.getQuests(req.user, 'available')
  })
})

app.get('/quests/active', (req, res) => {
  res.json({
    list: questDatabase.getQuests(req.user, 'active')
  })
})

app.get('/quests/complete', (req, res) => {
  res.json({
    list: questDatabase.getQuests(req.user, 'complete')
  })
})

app.patch('/quests/active/:questId', (req, res) => {
  const success = questDatabase.takeQuest(req.user, req.params.questId)

  if (!success) {
    return res.sendStatus(400)
  }

  res.json({
    availableList: questDatabase.getQuests(req.user, 'available'),
    activeList: questDatabase.getQuests(req.user, 'active')
  })
})

app.patch('/quests/complete/:questId', (req, res) => {
  const success = questDatabase.completeQuest(req.user, req.params.questId)
  console.log(success)

  if (!success) {
    return res.sendStatus(400)
  }

  res.json({
    activeList: questDatabase.getQuests(req.user, 'active'),
    completeList: questDatabase.getQuests(req.user, 'complete')
  })
})

app.listen(PORT, HOST)
console.log(`Running on https://${HOST}:${PORT} 🚀`)
