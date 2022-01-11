const discord = require('discord.js')
const jimp = require('jimp')

const CHARS = 15
const MAX_CHARACTER_PER_MESSAGE = 100
const START_AT = 0
const SEP = '|'

const types = [
  [
    'Albert Einstein',
    'filosofia/einstein.png',
    [450, 250]
  ],
  [
    'Aristóteles',
    'filosofia/aristoteles.png',
    [310, 150]
  ],
  [
    'Platão',
    'filosofia/platao.png',
    [85, 120]
  ],
  [
    'Lucas Matheus Lopes',
    'filosofia/lucasmatheus.png',
    [280, 100]
  ],
  [
    'Karl Marx',
    'filosofia/karlmarx.png',
    [50, 120]
  ],
  [
    'Friedrich Nietzsche',
    'filosofia/niet.png',
    [50, 120]
  ],
  [
    'Sócrates',
    'filosofia/socrates.png',
    [250, 100]
  ],
]

let frases = ['peraí, aguenta alguns segundos', 'processando...', 'espera aí apressado']

exports.classe = 'Diversão'
exports.desc = 'Mostra uma linda frase dita por filosofos incriveis, mesmo que você tenha acabado de criar'
exports.run = async(client, message, args) => {
  args.shift()
  
  var msg = args[0]
  if(!msg) {message.channel.send('providencie uma frase irmão!'); return;}

  msg = args.join(' ')
  
  if(msg.length > MAX_CHARACTER_PER_MESSAGE) {message.channel.send('o máximo por mensagem é **' + MAX_CHARACTER_PER_MESSAGE + '** caracteres! escreva uma frase que seja menor!'); return;}
  
  message.channel.send(frases[Math.floor(Math.random() * frases.length)])

  var selected = types[Math.floor(Math.random() * types.length)]
  const POS = selected[2]

  jimp.read(selected[1]).then(async(avatar) => {
    let font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
    let font2 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE)
    
    let target = msg
    let newText = '"' + target.charAt(START_AT)
    for(var i = 1; i < target.length; i++){
      var yes = (i % CHARS) == 0

      if(yes) {
        newText = newText + SEP + target.charAt(i)
      } else {
        newText = newText + target.charAt(i)
      }
    }
    
    var textCreated = ''
    let yCount = POS[1]
    for(var i = 0; i < newText.length; i++) {
      var char = newText.charAt(i)
      
      if(char == SEP) {
        avatar.print(font, POS[0], yCount, textCreated)
        textCreated = ''
        yCount += 28
      } else {
        textCreated = textCreated + newText.charAt(i)
        
        if(i == newText.length) {
          textCreated + textCreated + '"' 
        }
      }
    }
    
    if(textCreated !== '') {
      avatar.print(font, POS[0], yCount, textCreated + '"')
    }

    avatar.print(font2, POS[0], yCount + 50, `- ${selected[0]}, `+ new Date().getFullYear())
    
    avatar.write('filosofo_montagem.png')
    message.channel.send({
      files: [
        {
          attachment: 'filosofo_montagem.png',
          file: 'filosofo_montagem.png'
        }
      ]
    })
  }).catch(err => {
    console.log('erro kk')
    console.log(err)
  })
}
