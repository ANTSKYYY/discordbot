const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: '8ball',
	description: "Permet d'obtenir la réponse à des questions...",
  category: "Fun",
  async run(bot, message, args) {

    const replies = ["Oui", "Non", "Peut-être", "Tu es chaud(e)", "Compte là-dessus", "Fonce", "C'est OK", "Pas maintenant", "Absolument", "Très probable", "Attends ça", "Demande encore", "Ça va passer", "Ne peut pas dire maintenant", "Sans aucun doute"];

    
    const question = message.user ? args._hoistedOptions[0].value : args[0]
    const response = Math.floor(Math.random() * replies.length);

    const embed = new MessageEmbed()
      .setTitle("__**Prédictions**__")
      .setColor(bot.color)
      .setAuthor({ name: `Question de ${message.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`})
      .addFields(
        {name: "__**Question : ❔**__", value: `${question}`},
        {name: "__**Réponse à la question : ❗**__",value: `${replies[response]}`}
      )
      .setThumbnail('https://i.imgur.com/71GlQvJ.png')
      .setTimestamp()
      .setFooter({ text: `Nom de ton bot `, iconURL: 'https://i.imgur.com/DIapvsK.jpg'}) 

    message.reply({embeds: [embed]});
  }  
})