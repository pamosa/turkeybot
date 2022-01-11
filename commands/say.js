const Discord = require('discord.js');

exports.classe = 'Diversas'
exports.desc = 'O bot fala alguma coisa em certo chat'
module.exports.run = async(client, message, args) => {
  if(!args[1]) {
    message.channel.send('não encontrei texto algum, providencia aí irmão') 
    return
  }
  args.shift()
  message.channel.send(args.join(' '))
  message.delete()
}