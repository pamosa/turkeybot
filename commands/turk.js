const discord = require('discord.js')
const config = require('../config.json')
const fs = require('fs')

const randomGifs = fs.readdirSync('./gifs')

exports.classe = 'Diversão'
exports.desc = 'Mostra um gif aleatório do turkeyman'
exports.run = async(client, message, args) => {
  let f = randomGifs[Math.floor((Math.random() * randomGifs.length))]
  let msg = config.randomMessages[Math.floor((Math.random() * config.randomMessages.length))]
  console.log(f)
  message.channel.send(msg, {
    files: [
      {
        attachment: './gifs/' + f,
        file: f
      }
    ]
  })
}
