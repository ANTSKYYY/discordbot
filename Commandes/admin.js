const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: 'admin',
	description: "Permet de promouvoir administrateur un membre du serveur",
  category: "<:DISCORD_shield:963891927797870672> | Modération",

  async run(bot, message, args, interaction) {
    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
    if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})
    let member = message.guild.members.cache.get(user.id)

    if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

    const embed = new MessageEmbed()
      .setTitle("<:DISCORD_staff:963896942004412446> __**Promotion**__ <:DISCORD_staff:963896942004412446>")
      .setColor(bot.color)
      .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
      .setDescription(`<@${message.user.id}> à promu <@${user.id}> en tant que Administrateur du serveur !`)
      .setTimestamp()
      .setFooter({ text: `Antskyyy Bot`, iconURL: 'https://i.imgur.com/DIapvsK.jpg'}) 


      
      member.roles.add("906193945900486666")
      member.roles.remove("906194263681949706")

    message.reply({embeds: [embed], ephemeral: true});
    message.guild.members.cache.get(user.id).setNickname(`🤵 | ${user.username}`);
    bot.channels.cache.get('966750087147581520').send({ embeds: [embed]  })
  }  
})