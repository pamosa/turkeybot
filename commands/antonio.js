const discord = require('discord.js')
const jimp = require('jimp')

const MAX_CHARACTERS = 50

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Faz uma montagem com uma imagem com o Antônio (anyonio)'
exports.run = async(client, message, args) => {
  let font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE)
  let img = message.attachments.first()
  if(!img){
    message.channel.send('não encontrei nenhuma imagem irmão, providencie por favor...')
    return
  }
  if(!args[1]) {
    message.channel.send('especifique um texto filho da puta!')
    return
  }
  args.shift()
  
  var text = args.join(' ')
  
  if(text.length > MAX_CHARACTERS) {
    message.channel.send('máximo de caracteres é **' + MAX_CHARACTERS + '**!')
    return
  }
  
  if(message.attachments.first()) img = img.url

  message.channel.send(frases[Math.floor(Math.random() * frases.length)])

  var img2 = await jimp.read('antoniotemplate.png')
  jimp.read(img).then(avatar => {
    avatar.resize(img2.bitmap.width, img2.bitmap.height)
    img2.print(font, 15, 56, text)
    avatar.composite(img2, 0, 0).write('anyonio_montagem.png')
    message.channel.send({
      files: [
        {
          attachment: 'anyonio_montagem.png',
          file: 'anyonio_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log(err)
  })
}
