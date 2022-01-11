const discord = require('discord.js')
const jimp = require('jimp')

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Faz uma montagem com uma imagem com o gil pedreiro'
exports.run = async(client, message, args) => {
  let img = message.attachments.first() || message.mentions.users.first().avatarURL({dynamic: true, format: 'png', size: 1024}) || message.author.avatarURL({dynamic: true, format: 'png', size: 1024})
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...')
    return
  }
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])

  var img2 = await jimp.read('gil.png')
  jimp.read(img).then(avatar => {
    avatar.resize(img2.bitmap.width, img2.bitmap.height)
    avatar.composite(img2, 0, 0).write('gil_montagem.png')
    message.channel.send({
      files: [
        {
          attachment: 'gil_montagem.png',
          file: 'gil_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
  })
}