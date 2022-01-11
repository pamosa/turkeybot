const discord = require('discord.js')
const jimp = require('jimp')

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Destruirei algo que lhe faz mal'
exports.run = async(client, message, args) => {
  let img = message.attachments.first() || message.mentions.users.first().avatarURL || message.author.avatarURL
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...') 
    return
  }
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])
  
  var img2 = await jimp.read('destrua.png')
  var img3 = await jimp.read('destrua_mao.png')
  jimp.read(img).then(avatar => {
    avatar.resize(180, 180)
    img2.composite(avatar, 28, 80)
    img2.composite(img3, 0, 0).write('destrua_montagem.png')
    
    message.channel.send({
      files: [
        {
          attachment: 'destrua_montagem.png',
          file: 'destrua_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
    console.log(err)
  })
}
