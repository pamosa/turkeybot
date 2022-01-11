const discord = require('discord.js')
// -- ANTIGO --
// const random_anime = require('random-anime')
// ------------

const discordnsfw = require('@jcauman23/discordnsfw')
const NSFW = new discordnsfw()
const hentaiTypes = [
  ['anal', 'anal'],
  ['4k', 'fourk'],
  ['ass', 'ass'],
  ['gonewild', 'gonewild'],
  ['porngif', 'pgif'],
  ['pussy', 'pussy'],
  ['thigh', 'pussy'],
  ['boobs', 'boobs'],
  ['hentaiass', 'hass'],
  ['hentai', 'hentai'],
  ['hentaithigh', 'hthigh'],
  ['erokemo', 'erokemo'],
  ['neko', 'neko'],
  ['cum', 'cum'],
  ['yuri', 'yuri']
]

function validateHentaiType(hentaiType) {
  let v
  hentaiTypes.forEach(ht => {
    console.log(ht[0], hentaiType)
    if(ht[0] == hentaiType) {
      console.log('yes')
      v = ht
    }
  }) 
  
  return v
}

exports.classe = 'Diversão'
exports.desc = 'Hentai aleatório'
exports.run = async(client, message, args) => {
  if(!message.channel.nsfw) {message.channel.send('calma aí meu punheteiro, o canal precisa ser **NSFW** para enviar hentais!'); return}
  
  var htype = args[1]
  console.log(htype)
  
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
  
  message.channel.send(NSFW[h]()).then(() => {}).catch(() => {
    message.channel.send('algum problema deu ao enviar o hentai, tente novamente meu amigo!')
  })
}
