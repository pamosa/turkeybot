const discord = require('discord.js')
const fs = require('fs')

var separateObjectsPerClass = function() { // função de separar cada comando para uma classe
  let objs = {}
  let files = fs.readdirSync('./commands')

  // criar classes
  files.forEach(v => {
    if(v.search('.js')) {
      let cmd = require('./' + v)
      objs[cmd.classe] = {}
    }
  })

  // colocar objetos dentro da classe
  files.forEach(v => {
    if(v.search('.js')) {
      let cmd = require('./' + v)
      let str = v.replace('.js', '')
      objs[cmd.classe][str] = [str, cmd.desc]
    }
  })

  return objs
}

function getAllCommandsOfClass(className) {
  let cmds = []
  let files = fs.readdirSync('./commands')
  files.forEach(v => {
    if(v.search('.js')) {
      let cmd = require('./' + v)
      if(cmd.classe == className) {
        cmds.push('**' + v.replace('.js', '') + '**: ' + '``' + cmd.desc + '``')
      }
    }
  })

  return cmds
}

exports.classe = 'Ajuda'
exports.desc = 'Mostra todos os comandos do bot'
exports.run = async(client, message, args) => {
  let cmds = separateObjectsPerClass()
  let embed = new discord.MessageEmbed()

  embed.setColor('#d92f23')
  embed.setTitle('Comandos')
  embed.setDescription('Todos os comandos abaixo :flag_tr:')
  embed.setTimestamp()
  for(var k in cmds) {
    embed.addField('| ' + k + ':', getAllCommandsOfClass(k).join('\n'))
  }

  message.channel.send(embed)
}