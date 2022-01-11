const discord = require('discord.js')
const config = require('../config.json')

exports.classe = 'Ajuda'
exports.desc = 'Comando principal de ajuda'
exports.run = async(client, message, args) => {
  let embed = new discord.MessageEmbed()
    .setColor('#d92f23')
    .setTitle('Help')
    .setThumbnail(client.user.avatarURL)
    .setDescription('Opa, sou o TurkeyBot. Um bot criado pela zoeira por 2 donos retardados mentais. O bot não tem muita coisa, é só pra "homenagear" o meme do turkeyman que está andando por aí na internet ')
    .addFields(
      {name: 'Donos', value: '``@yeaimunivb`` e ``@paamosa``'},
      {name: 'Programado em', value: 'Javascript, usando node.js & discord.js'},
      {name: 'Prefixo', value: config.prefix},
      {name: 'Comandos', value: `Use ${config.prefix}comandos para ver todos os comandos!`},
      {name: 'Invite', value: `Quer me adicionar no seu servidor? Use ${config.prefix}invite para o convite!`}
    )
    .setTimestamp()
  message.channel.send(embed)
}
