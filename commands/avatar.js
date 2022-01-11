const Discord = require('discord.js'); 

exports.classe = 'Diversas'
exports.desc = 'Mostra o avatar de um usuário'
exports.run = async(client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
  
  let avatar = user.avatarURL({dynamic: true, format: 'png', size: 1024})

  let embed = new Discord.MessageEmbed() 
    .setColor('#d92f23') 
    .setImage(avatar)
    .setTimestamp()
  message.channel.send(embed)
}