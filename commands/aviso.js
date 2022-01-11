const discord = require('discord.js')
const fs = require('fs')

const config = require('../config.json')

exports.classe = 'Diversão'
exports.desc = 'Aviso do edukof 😎'
exports.run = async(client, message, args) => {
  let f = config.randomAvisos[Math.floor((Math.random() * config.randomAvisos.length))]
  message.channel.send({
    files: [
      {
        attachment: './avisos/' + f,
        file: f
      }
    ]
  })
}