const discord = require('discord.js')
// -- ANTIGO --
// const random_anime = require('random-anime')
// ------------

const discordnsfw = require('@jcauman23/discordnsfw')
const NSFW = new discordnsfw()
const hentaiTypes = [
  ['wallpaper', 'wallpaper'],
  ['solo', 'solo'],
  ['lewd', 'lewd'],
  ['kitsune', 'kitsune'],
  ['erokemo', 'erokemo'],
  ['hentaimidriff', 'hmidriff'],
  ['hentaiass', 'hass'],
  ['hentai', 'hentai'],
  ['hentaithigh', 'hthigh'],
  ['erokemo', 'erokemo'],
  ['neko', 'neko'],
  ['nekogif', 'nekogif'],
  ['nekofeet', 'nekofeet'],
  ['nekopussy', 'nekopussy'],
  ['nekotits', 'nekotits'],
  ['yuri', 'yuri']
]

function validateHentaiType(hentaiType) {
  let v
  hentaiTypes.forEach(ht => {
    if(ht[0] == hentaiType) {
      v = ht
    }
  }) 
  
  return v
}

exports.classe = '+18'
exports.desc = 'Hentai aleatório'
exports.run = async(client, message, args) => {
  if(!message.channel.nsfw) {message.channel.send('calma aí meu punheteiro, o canal precisa ser **NSFW** para enviar hentais!'); return}
  
  var htype = args[1]
  
  if(!htype) {
    message.channel.send('meu querido, especifica o CARALHO do tipo de hentai filho de uma puta!')
    return
  }
  
  var h = validateHentaiType(htype)
  
  if(!h) {
    message.channel.send('tipo inválido de hentai meu mano!') 
    return
  }
  
  h = h[1]
  
  var hentai_img = await NSFW[h]()
  
  message.channel.send(hentai_img).then(() => {}).catch(err => {
    console.log(err)
    message.channel.send('algum problema deu ao enviar o hentai, tente novamente meu amigo!')
  })
}
