const Discord = require("discord.js");

exports.classe = 'Moderação'
exports.desc = 'Apaga uma certa quantia de mensagens'
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    message.reply(
      "meu parceiro, to sem permissão, ai dificulta as coisas né"
    );
    return
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    message.reply(
      "tem q falar um número de até **99 mensagens** pra excluir né caraio"
    );
    return

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched);
  message.channel
    .send(`**apaguei as ${args[0]} mensagens que tu falou meu parceiro**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`ai mano, deu isso aqui ta ligado: ${error}`)
    );
};