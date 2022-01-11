const discord = require('discord.js')

exports.classe = 'Ajuda'
exports.desc = 'Mando o meu invite'
exports.run = async(client, message, args) => {
  message.author.send('salve irmão, tá aqui o meu invite https://discord.com/oauth2/authorize?client_id=742428564888223805&permissions=8&scope=bot').then(() => {
    message.channel.send('enviei no seu privado! :thumbsup:\n\n**OBS: Se eu não enviei, significa que você desabilitou as mensagens privadas de membros, caso queira usar o comando, por gentileza ative :)**')
  }).catch(() => {})
}
