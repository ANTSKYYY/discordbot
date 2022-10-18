const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: 'rouletterusse',
	description: "Joue avec poutine et ton sang froid...",
  category: "<a:DISCORD_jeux:965003658343362641> | Fun",
  async run(bot, message, args) {
    const replies = [':dash: :gun: Ca passe pour cette fois...',
    ':dash: :gun: Ca passe pour cette fois...',
    ':dash: :gun: Ca passe pour cette fois...',
    ':dash: :gun: Ca passe pour cette fois...',
    ':dash: :gun: Ca passe pour cette fois...',
    '<a:Pepe_Shoot1:963464926242942976>🔥 Aïe Aïe Aïe, bon bah passe le bonjour à johny',];
    const response = Math.floor(Math.random() * replies.length);

    const embed = new MessageEmbed()
      .setTitle("<:7451pepegunr:963466327752867891> __**Roulette Russe**__ <:7451pepegunr:963466327752867891>")
      .setColor(bot.color)
      .setAuthor({ name: `Jeux de ${message.user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`})
      .setDescription(`T'as voulu jouer avec le feu , voila le resultat :\n**${replies[response]}**`)
      .setThumbnail('https://i.imgur.com/0urKDo9.png')
      .setTimestamp()
      .setFooter({ text: `Antskyyy Bot`, iconURL: 'https://i.imgur.com/DIapvsK.jpg'}) 

    message.reply({embeds: [embed]});
  }  
})