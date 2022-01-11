const discord = require('discord.js')
const fs = require('fs')

const config = require('../config.json')

exports.classe = 'Diversão'
exports.desc = 'FBI open up!'
exports.run = async(client, message, args) => {
  let f = config.randomCorras[Math.floor((Math.random() * config.randomCorras.length))]
  message.channel.send({
    files: [
      {
        attachment: './corra/' + f,
        file: f
      }
    ]
  })
}