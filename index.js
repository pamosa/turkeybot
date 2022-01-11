/* 

@name TurkeyBOT
  @author univb(@yeaimunivb), pamosa(@paamosa)
  @since August 10, 2020

*/

// Libs/Modules
const Discord = require('discord.js')
const Fs = require('fs')

const CooldownHandler = require('./util/CooldownHandler.js')

const config = require('./config.json')
const token = 'NzQyNDI4NTY0ODg4MjIzODA1.XzF-ew.NYgSY797G6y4bFD3nK5Vi8nPDzI'

// Consts
const Client = new Discord.Client()

const prefix = config.prefix

// Lets/Vars
var cooldowns = new CooldownHandler()

// Setting up commands & 'message' event
Fs.readdir('./commands', (err, files) => {
  var Commands = []

  files.forEach((name) => {
    if(name.match('.js')) {
      let file = name.toString().replace('.js', '')
      Commands.push(file)
      console.log(`:: ${prefix}${file} carregado com sucesso!`)
    }
  })

  Client.on('message', message => {
    if(message.author.bot) return
    if(message.author.id == Client.user.id) return
    if(message.channel.type == 'dm') return
    if(message.content.startsWith(`<@!${Client.user.id}>`)) {
      message.channel.send('Salve meu patrão, sou o **TurkeyBot**! Sou um bot irônico criado por ``@paamosa`` e ``@yeaimunivb``. use **' + prefix + 'help** se quiser ver coisas sobre mim')
      return
    }
    if(!message.content.toLowerCase().startsWith(config.prefix)) return
  
    const args = message.content.split(' ')

    var ok = false

    Commands.forEach((name) => {
      if(ok) return

      if(message.content.toLowerCase().startsWith(`${prefix}${name.toLowerCase()}`)) {
        cooldowns._check(message, function() {
          require(`./commands/${name}.js`).run(Client, message, args)
        }, function(timeRemaining) {
          message.channel.send('Opaaa, calma ai queridão, aguarde **' + timeRemaining + ' segundos** pra executar outro comando! :flag_tr:')
        })
        ok = true
      }
    })
    if(ok == false) {
      message.channel.send('comando inválido meu amigo')
    }
  })
})

// Ready Event
Client.on('ready', () => {
  const randomStatus = ['🤡 feito por @paamosa e @yeaimunivb 🤡', 'https://twitter.com/SpaceX/status/1347258678940897280', 'uzun ömürlü türkiye, eu sou turco e uso o tradutor :(', 'viva a russia também ', 'grande turquia', `prefix: ${config.prefix}`]
  const segundos = 7

  setInterval(() => {
    Client.user.setActivity(randomStatus[Math.floor((Math.random() * randomStatus.length))], {type: 'PLAYING'})
  }, segundos*1000)
  console.log('Bot está em ' + Client.guilds.cache.size + ' servidores!')
  console.log('Bot carregado com sucesso!')
})


Client.login(token)
