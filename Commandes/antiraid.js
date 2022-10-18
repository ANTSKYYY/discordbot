const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "antiraid",
    description: "Permet d'activer ou de désactiver le monde anti-raid",
    utilisation: "[on/off]",
    alias: ["antiraid", "raid"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "<:DISCORD_staff:963896942004412446> | Système",
    cooldown: 10,

    async run(bot, message, args, db) {

        let choix = message.user ? args._hoistedOptions[0].value : args[0]
        if(!choix) return message.reply("Veuillez indiquer \`on\` ou \`off\` !")
        if(choix !== "on" && choix !== "off") return message.reply("Veuillez indiquer \`on\` ou \`off\` !")

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guildId}`, async (err, req) => {

            if(req.length < 1) return message.reply("Ce serveur n'est pas encore enregistré !")
            if(req[0].raid === choix) return message.reply(`<:DISCORD_cross:963466511324950558> L'anti-raid est déjà ${choix === "on" ? "activé" : "désactivé"} !`)

            db.query(`UPDATE serveur SET raid = '${choix}' WHERE guildID = ${message.guildId}`)

            message.reply(`<:DISCORD_check:963466510242832544> L'anti-raid est a été ${choix === "on" ? "activé" : "désactivé"} !`)

            if(choix == "on"){
                
              const raid = new MessageEmbed()
              .setColor('#FF0000')
              .setTitle('<:DISCORD_staff:963896942004412446> __**Annonce !**__ <:DISCORD_staff:963896942004412446>')
              .setURL('https://discord.gg/u8gsYrsg')
              .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
              .setDescription("__**Le serveur vient de passer en mode Anti-raid !**__  \n Cela signifit que si quelqu'un rejoint le serveur , il y'est automatiquement **expulsé**\nCela permet d'eviter toute dégradation du serveur\nPour que chacun puisse retourner sur le serveur __**sans bug ni risque**__")
              .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
              .setTimestamp()
              .setFooter({ text: 'Merci de votre compréhension !', iconURL: 'https://i.imgur.com/DIapvsK.jpg'})
                
              let msg = await bot.channels.cache.get("906192240551002113").send({ embeds: [raid], content: `@everyone`})
            }
        })
    }
}) 