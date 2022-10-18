const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const tick = '<:DISCORD_cross:963466511324950558>'
const cd = '<:DISCORD_check:963466510242832544>'
module.exports = {
	name: 'jour',
	description: "Permet d'envoyer l'embed des récompenses quotidiennes",
  category: "<:DISCORD_staff:963896942004412446> | Système",
	async run(bot, message, args, db) {

    const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
    .setStyle("PRIMARY")
    .setLabel("Recuperer la récompense")
    .setEmoji("🎁")
    .setCustomId("recomp"))     


        const BASE = new MessageEmbed()
        .setColor(bot.color)
        .setTitle('🎁 __**Récompense quotidienne**__ 🎁')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
        .setDescription(`Recupère tous les jours à ` + "`" + `00h00 ou plus tard` + "`" + ` , une récompense de 20€ à 100€ aléatoirement en cliquant sur le bouton ci dessous ! 👇\nTu peux ensuite utiliser cet argent pour des minis-jeux et même bientôt pour une boutique...`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
        .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true})}) 

        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
        message.channel.send({embeds: [BASE], components: [btn]})
    

  }   
}