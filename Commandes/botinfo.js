const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
	name: 'botinfo',
	description: "Permet de voir les informations du bot",
  category: "<:DISCORD_ticket:963890159726755850> | Information",
	async run(bot, message, args, member) { 

    const core = os.cpus()[0];
		const embed = new MessageEmbed()
       .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
      .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png?size=256`)
			.setColor(bot.color)
      .setTitle("__**Les informations du bot :**__")
      .addFields(
        {name: "**❯ ID Du Client :**", value: "`" + `${bot.user.id}` + "`"},
        {name: "**❯ Nombre de commandes :**", value: "`" + `${bot.commands.size}` + "`"},
        {name: "**❯ Date de création :**", value: "`" + `${utc(bot.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}` + "`"},
        {name: "**❯ Version Node.js :**", value: "`" + `${process.version}` + "`"},
        {name: "**❯ Platforme :**", value: "`" + `${process.platform}` + "`"},
        {name: "**❯ Allumé depuis  :**", value: "`" + `${ms(os.uptime() * 1000, { long: true })}` + "`"},
        {name: "**❯ Modèle du processeur :**", value: `${core.model}`},
        {name: "**❯ Nombre de Coeurs( *proccesseur* ) :**", value: "`" + `${os.cpus().length}` + "`"},
        {name: "**❯ Vitesse du processeur :**", value: "`" + `${core.speed} MHz` + "`"},
        {name: "**❯ Memoire utilisé :**", value: "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` + "`"},

      )
			.setTimestamp()
      .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true})}) 
        
        message.reply({embeds: [embed]})

  }   
}