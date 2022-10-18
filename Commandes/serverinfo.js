const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "serverinfo",
    description: "Permet d'avoir des informations sur le serveur",
    utilisation: "(membre)",
    alias: ["serverinfo", "si"],
    permission: "Aucune",
    category: "<:DISCORD_ticket:963890159726755850> | Information",
    cooldown: 0,

    async run(bot, message, args, db) {

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
        .setTitle(`Informations sur le serveur ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
          { name: `- **<:DISCORD_ticket:963890159726755850> Nom** :`, value: "`" + `${message.guild.name}` + "`" },
          { name: `- **<:CDiscord_Couronne:963540123432132659> Propriétaire** :`, value: `${(await message.guild.fetchOwner())}` },
          { name: `- **<:DISCORD_id:963896435823226960> ID** :`, value: "`" + `${message.guild.id}` + "`"},
          { name: `- **<:DISCORD_staff:963896942004412446> Date de création** :`, value: `<t:${Math.floor(message.guild.createdAt / 1000)}:F>`},
          { name: `- **<a:DISCORD_boost:965002238844084285> Boost** :`, value: "`" + `${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})` + "`"  },
          { name: `- **<:DISCORD_channel:963885696337195129> Salons** :`, value: "`" + `${message.guild.channels.cache.size}` + "`"  },
          { name: `- **<:DISCORD_shield:963891927797870672> Rôles** :`, value: "`" + `${message.guild.roles.cache.size}` + "`"  },
          { name: `- **<:2551heart:963466511148785726> Emojis** :`, value: "`" + `${message.guild.emojis.cache.size}` + "`"  },
          { name: `- **<:DISCORD_members:963885302101987348> Membres** :`, value: "`" + `${message.guild.members.cache.size}` + "`"  },
          { name: `- **<:DISCORD_inbox:963886870163513364> Règlement** :`, value: `${message.guild.rulesChannel ? message.guild.rulesChannel : "Aucun"}`},

        )
        
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

        await message.reply({ embeds: [Embed] })
    }
})