const COOLDOWN_TIME = 3 // <-- em segundos / in seconds

class CooldownHandler {
  constructor(user) {
    this.cooldowns = {}
  }

  _check(message, success, failed) {
    if(!this.cooldowns[message.author]) {
      this.cooldowns[message.author] = Date.now()
      
      success()
    } else {
      var elapsedTime = (Date.now() - this.cooldowns[message.author]) / 1000
      var timeRemaining = Math.floor(COOLDOWN_TIME - (Date.now() - this.cooldowns[message.author]) / 1000)

      if(elapsedTime >= COOLDOWN_TIME) {
        this.cooldowns[message.author] = Date.now()
        
        success()
      } else {
        failed(timeRemaining)
      }
    }
  }
}

module.exports = CooldownHandler