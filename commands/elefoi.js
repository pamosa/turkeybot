const discord = require('discord.js')
const jimp = require('jimp')

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Fala quem certa pessoa foi'
exports.run = async(client, message, args) => {
  let img = message.attachments.first() || message.mentions.users.first().avatarURL({dynamic: true, format: 'png', size: 1024}) || message.author.avatarURL({dynamic: true, format: 'png', size: 1024})
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...')
    return
  }
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])

  var img2 = await jimp.read('elefoi.png')
  jimp.read(img).then(avatar => {
    avatar.resize(690, 1071)
    img2.composite(avatar, 0, 0).write('elefoi_montagem.png')
    message.channel.send({
      files: [
        {
          attachment: 'elefoi_montagem.png',
          file: 'elefoi_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
  })
}
