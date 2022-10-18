const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "ticket",
    description: "Permet d'envoyer l'embed des tickets",
    utilisation: "",
    alias: ["ticket", "t"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "<:DISCORD_staff:963896942004412446> | Système",
    cooldown: 10,

    async run(bot, message, args, db) {

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`<:DISCORD_staff:963896942004412446> __**Tickets**__`)
        .setDescription("**Appuyer sur le bouton ci-dessous pour ouvrir un ticket**\n*Pense à checker les <#906191168285597771> avant d'ouvrir un ticket afin de ne pas déranger les moderateurs pour pas grand chose !*")
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/aQywUiq.png')
        .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Ouvrir un ticket")
        .setEmoji("📩")
        .setCustomId("ticket"))

        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        message.author ? await message.delete() : await message.deferReply() && await message.deleteReply();
        await message.channel.send({embeds: [Embed], components: [btn]})
    }
})