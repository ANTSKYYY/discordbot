const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: 'reseaux',
	description: "Permet d'envoyer l'embed des reseaux",
  category: "<:DISCORD_ticket:963890159726755850> | Information",
  async run(bot, message, args) {


    if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
    const embed = new MessageEmbed()
      .setTitle("<:DISCORD_ticket:963890159726755850> __**Les réseaux sociaux de Antskyyy**__ <:DISCORD_ticket:963890159726755850>")
      .setDescription("Ici , tu peux retrouver les réseaux sur lesquels Antskyyy est le plus présent, n'hesite pas à aller le suivre dessus pour lui donner de la force !")
      .setColor(bot.color)
      .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
      .addFields(
        {name: "__**Instagram**__", value: `[Lien](https://www.instagram.com/antskyyy1/)`, inline: true},
        {name: "__**Youtube**__",value: `[Lien](https://www.youtube.com/channel/UCtqAo-y33jyWRNQkioVjcYg)`, inline: true},
        {name: "__**Son site**__",value: `[Lien](https://antskyyy.holo-food.store)`, inline: true}
      )
      
      .setImage('https://i.imgur.com/6vV3xwH.jpg')
      .setTimestamp()
      .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true})}) 

    message.channel.send({embeds: [embed]});
  }  
})