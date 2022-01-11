const discord = require('discord.js')
const jimp = require('jimp')

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Montagem do turkeyman com uma imagem'
exports.run = async(client, message, args) => {
  let img = message.attachments.first() || message.mentions.users.first().avatarURL({dynamic: true, format: 'png', size: 1024}) || message.author.avatarURL({dynamic: true, format: 'png', size: 1024})
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...') 
    return
  }
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])
  
  var img2 = await jimp.read('turco.png')
  jimp.read(img).then(avatar => {
    avatar.resize(106, 179)
    img2.composite(avatar, 351, 42).write('turco_montagem.png')
    message.channel.send({
      files: [
        {
          attachment: 'turco_montagem.png',
          file: 'turco_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
  })
}