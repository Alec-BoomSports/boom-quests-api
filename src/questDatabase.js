const { quests } = require('./quests')

class QuestDatabase {
  constructor (questList) {
    this.questDb = new Map()
    this.questList = questList
  }

  getQuests (user, type) {
    if (!this.questDb.has(user)) {
      this.initQuests(user)
    }

    return this.questDb.get(user).get(type)
  }

  takeQuest (user, id) {
    const availableQuests = this.questDb.get(user).get('available')
    for (let i = 0; i < availableQuests.length; i++) {
      if (availableQuests[i].id === id) {
        this.questDb.get(user).set('available', this.questDb.get(user).get('available').filter(it => it !== availableQuests[i]))
        this.questDb.get(user).set('active', this.questDb.get(user).get('active').concat(availableQuests[i]))
        return true
      }
    }
    return false
  }

  completeQuest (user, id) {
    const availableQuests = this.questDb.get(user).get('active')
    for (let i = 0; i < availableQuests.length; i++) {
      if (availableQuests[i].id === id) {
        this.questDb.get(user).set('active', this.questDb.get(user).get('active').filter(it => it !== availableQuests[i]))
        this.questDb.get(user).set('complete', this.questDb.get(user).get('complete').concat(availableQuests[i]))
        return true
      }
    }
    return false
  }

  initQuests (user) {
    this.questDb.set(user, new Map([
      ['available', this.questList],
      ['active', []],
      ['complete', []]
    ]))
  }
}

module.exports.questDatabase = new QuestDatabase(quests)
