const discord = require('discord.js')
const jimp = require('jimp')

const MAX = 105

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Tento zoar o máximo uma imagem'
exports.run = async(client, message, args) => {
  let img = message.attachments.first() || message.mentions.users.first().avatarURL({dynamic: true, format: 'png', size: 1024}) || message.author.avatarURL({dynamic: true, format: 'png', size: 1024})
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...')
    return
  }
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])

  const color = {r: Math.floor(Math.random() * MAX), g: Math.floor(Math.random() * MAX), b: Math.floor(Math.random() * MAX), a: Math.floor(Math.random() * MAX)}

  jimp.read(img).then(avatar => {
    avatar.scan(0, 0, avatar.bitmap.width, avatar.bitmap.height, (x, y, idx) => {
      var pixel = jimp.intToRGBA(avatar.getPixelColor(x, y));
      
      avatar.bitmap.data[idx + 0] = avatar.bitmap.data[idx + 0] - color.r,
      avatar.bitmap.data[idx + 1] = avatar.bitmap.data[idx + 1] - color.g,
      avatar.bitmap.data[idx + 2] = avatar.bitmap.data[idx + 2] - color.b,
      avatar.bitmap.data[idx + 3] = avatar.bitmap.data[idx + 3] - color.a
    })
    
    avatar.write('montagem_zoada.png')
    message.channel.send({
      files: [
        {
          attachment: 'montagem_zoada.png',
          file: 'montagem_zoada.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
    console.log(err)
  })
}
