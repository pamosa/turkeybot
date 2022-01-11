const discord = require('discord.js')

const config = require('../config.json')

const MAX_FIGHTERS = 5
const MAX_LOOTS_PER_USER = 2
const MAX_LOOT_GENERATION = 15 // Must be higher than max fighters
const LOOT_TYPES = [
  // Armas
  ['Rifle', 'Gun', {Damage: 25}], // "NAME", "TYPE", "CUSTOM_STATS"
  ['DesertEagle', 'Gun', {Damage: 40}],
  ['AK-47', 'Gun', {Damage: 30}],
  ['UZI', 'Gun', {Damage: 15}],
  ['AR-15', 'Gun', {Damage: 30}],
  ['Peixe', 'Weapon', {Damage: 100}],
  ['Bazuca', 'Gun', {Damage: 50}],
  ['Faca', 'Weapon', {Damage: 10}],
  ['Thompson', 'Gun', {Damage: 35}],
  ['Piranha', 'Weapon', {Damage: 10}],
]

// Functions
let copy = function(arr) {
  var newArr = []
  
  for(var i = 0; i < arr.length; i++) {
    if(typeof(arr) == 'Array') {
      newArr[i] = copy(arr[i]) 
    } else {
      newArr[i] = arr[i] 
    }
  }
  
  return newArr
}

let removeFromIndex = function(arr, idx) {
  arr.splice(idx == 0 ? 0 : idx, idx == 0 ? 1 : idx)

  return arr
}

// Classes
class Loot {
  constructor(name, type, stats) {
    this.Name = name
    this.Type = type
    
    this.Stats = stats || {}
    
    return this
  }
}

class Game {
  constructor() {
    this.Players = []
    this.Loots = []
    
    return this
  }
  
  _createRandomLoots(max) {
    this.Loots = []
    for(var i = 0; i < max; i++) {
      var loot = LOOT_TYPES[Math.floor(Math.random() * LOOT_TYPES.length)]
      loot = new Loot(loot[0], loot[1], loot[2])
      
      this.Loots.push(loot)
    }
  }
  
  _removeLoot(idx) {
    this.Loots = removeFromIndex(this.Loots, idx)
  }
}

class Player {
  constructor(name) {
    this.Name = name
    this.Inventory = []
    this.Health = 100
    
    this._died = false
    this._kills = 0
    
    return this
  }
  
  TakeDamage(value) {
    this.Health -= value
    
    if(this.Health <= 0) {
      this._died = true 
    }
  }
  
  _collectLoot(loot) {
    this.Inventory.push(loot)
  }
}

exports.classe = 'Diversão'
exports.desc = `Faço um duelo entre 2 até ${MAX_FIGHTERS} pessoas`
exports.run = async(client, message, args) => {
  var person1 = args[1]
  
  if(!person1) {message.channel.send('opa meu queridão, você não especificou a primeira pessoa do duelo! \n**exemplo:** ``' + config.prefix + 'duelo [pessoa1] [pessoa2]``'); return;}
  if(args.length > MAX_FIGHTERS + 1) {message.channel.send('máximo de pessoas no duelo é **' + MAX_FIGHTERS + '**!'); return;}
  if(args.length == 2) {message.channel.send('mínimo de pessoas no duelo é **' + 2 + '**!'); return;}
  
  var fighters = [args[1]]
  
  for (var i = 2; i < MAX_FIGHTERS + 1; i++) {
    if(args[i]) {
       fighters.push(args[i])
    }
  }
  
  var everyone = message.content.includes('@everyone') ? true : false
  
  if(everyone) {
    message.channel.send('haha espertinho, achando que pode everyone?')
    return
  }
  
  var final_message = ''
  
  let game = new Game()
  for(var i = 0; i < fighters.length; i++) {
    let jogador = new Player(fighters[i])
    game.Players.push(jogador)
  }
  
  game._createRandomLoots(MAX_LOOT_GENERATION)
  
  // Step 1: Players collects their loots
  for(var i = 0; i < game.Players.length; i++) {
    let player = game.Players[i]
    let loots = Math.floor(Math.random() * MAX_LOOTS_PER_USER) + 1
    
    console.log(loots)
    
    for(var x = 0; x < loots; x++) {
      var idx = Math.floor(Math.random() * game.Loots.length)
      var rnd_loot = game.Loots[idx]

      player._collectLoot(rnd_loot)

      final_message = final_message + `**${player.Name}** coletou **${rnd_loot.Name}**!\n`
    }
  }
  
  final_message = final_message + '\n'
  
  // Step 2: Players start fighting each other
  for(var i = 0; i < 100000; i++) {
    var plrs = copy(game.Players)
    
    if(game.Players.length == 1) {
      break 
    }
    
    var idx1 = Math.floor(Math.random() * plrs.length)
    let player_1 = plrs[idx1]
    
    plrs = removeFromIndex(plrs, idx1)
    
    var idx2 = Math.floor(Math.random() * plrs.length)
    let player_2 = plrs[idx2]
    
    var chance = Math.random()
    
    if(chance < 0.8) {
      let gun = player_2.Inventory[Math.floor(Math.random() * player_2.Inventory.length)]

      final_message = final_message + `**${player_2.Name}** matou **${player_1.Name}** com um(a) **${gun.Name}**\n`
      
      game.Players[idx2]._kills += 1

      game.Players = removeFromIndex(game.Players, idx1)
    } else {
       final_message = final_message + `**${player_1.Name}** se empolgou demais e acabou morrendo de queda!\n`
       
       game.Players = removeFromIndex(game.Players, idx1)
    }
  }
  
  // Step 3: Get winner
  let winner = game.Players[0]
  
  var y = winner._kills == 0 ? `ganhou fazendo literalmente nada!` : `ganhou o duelo!`
  
  final_message = final_message + `\n**${winner.Name}** ` + y
  
  message.channel.send(final_message)
}
