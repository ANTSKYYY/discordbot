const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "role",
    description: "Permet d'envoyer l'embed des roles",
    utilisation: "",
    alias: ["role"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "<:DISCORD_staff:963896942004412446> | Système",
    cooldown: 10,

    async run(bot, message, args, db) {
      
        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Notifications")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Veuillez choisir les rôles de notifications que vous voulez dans le menu déroulant ci-dessous.")
        
        .addFields(
            {name: "<:7913xmasgift:963540123260166217> | Giveaway", value: "Rôle de notification pour le concours."},
            {name: "📆 | Events", value: "Rôle de notification pour les Evenements."},
            {name: "<:SOCIAL_youtube:964225939301101568> | Youtube", value: "Rôle de notification pour les nouvelles vidéos."},
            {name: "🗒️ | Patch Note", value: "Role de notifications des patch note du bot du serveur !"}
        )
        .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const menu = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
        .setCustomId("menu")
        .setMaxValues(4)
        .setMinValues(0)
        .setPlaceholder("Nous attendons votre choix !")
        .addOptions([{label: "Giveaway", description: "Rôle de notification pour le concours", emoji: "<:7913xmasgift:963540123260166217>", value: "giveaway"}, {label: "Event", description: "Rôle de notification pour les Evenements", emoji: "📆", value: "event"}, {label: "Youtube", description: "Rôle de notification pour les nouvelles vidéos", emoji: "<:SOCIAL_youtube:964225939301101568>", value: "youtube"}, {label: "Patch note", description: "Role de notifications des patch note du bot du serveur !", emoji: "🗒️", value: "patch"}]))


        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        let channel2 = bot.channels.cache.get("962730512248610966")
        try {
            await channel2.bulkDelete(1)
        } catch (err) {}

      
       

        message.author ? await message.delete() : await message.deferReply() && await message.deleteReply();
        await message.channel.send({embeds: [Embed], components: [menu]})

      
        
    }
})