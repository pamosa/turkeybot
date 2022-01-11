const discord = require('discord.js')

exports.classe = 'Ajuda'
exports.desc = 'Mostra o ping atual do bot'
exports.run = async(client, message, args) => {
  let embed = new discord.MessageEmbed()

  embed.setColor('#ee00ff')
  embed.setTitle('Ping')
  embed.setDescription('Meu lindo ping :flag_tr:')
  embed.addField('| Latência API', `${client.ws.ping}ms`)
  embed.setTimestamp()

  message.channel.send(embed)
}
