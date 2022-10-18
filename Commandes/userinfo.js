const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "userinfo",
    description: "Permet d'avoir des informations sur un utilisateur",
    utilisation: "(membre)",
    alias: ["userinfo", "ui"],
    permission: "Aucune",
    category: "<:DISCORD_ticket:963890159726755850> | Information",
    cooldown: 0,

    async run(bot, message, args, db) {



            let user;
            if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
                user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
                if(!user) return message.reply("Aucune personne trouvée !")
            } else user = message.user ? message.user : message.author;
            let member = message.guild.members.cache.get(user.id)

            const userFlags = user.flags.toArray();
            let s;
            if (userFlags.size > 1) { s = "Badges" } else { s = "Badge" };

            const flags = {
              DISCORD_EMPLOYEE: ':badgediscordemployee:',
              PARTNERED_SERVER_OWNER: ':badgepartner:',
              BUGHUNTER_LEVEL_1: ':badgebughunter1:',
              BUGHUNTER_LEVEL_2: ':badgebughunter2:',
              HYPESQUAD_EVENTS: ':badgehypesquadevent:',
              HOUSE_BRAVERY: '<:DISCORD_badgehypebravery:966598814771322890>',
              HOUSE_BRILLIANCE: '<:DISCORD_badgehypebrilliance:966598815148834856>',
              HOUSE_BALANCE: '<:DISCORD_badgehypebalance:966598814523863080>',
              EARLY_SUPPORTER: ':badgeearlysupporter:',
              TEAM_USER: 'Équipe Discord',
              SYSTEM: 'Système',
              VERIFIED_BOT: 'Bot Certifié',
              EARLY_VERIFIED_BOT_DEVELOPER: ':badgedeveloper:'
          };


            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addFields(
              { name: `- **<:DISCORD_members:963885302101987348> Pseudo** :`, value: "`" + `${user.username}` + "`" },
              { name: `- **<:DISCORD_channel:963885696337195129>  Tag** :`, value: "`" + `${user.discriminator}` + "`"  },
              { name: `- **<:DISCORD_link:963885928882008075> URL de l'avatar** :`, value: `[Lien](${user.displayAvatarURL({dynamic: true})})`},
              { name: `- **<:DISCORD_bot:963886172189364324> Robot** :`, value: "`" + `${user.bot ? "Oui" : "Non"}` + "`"  },
              { name: `- **<:DISCORD_inbox:963886870163513364> Status** :`, value: "`" + `${member ? member.presence ? member.presence.status : "Hors-ligne" : "Inconnu"}` + "`"  },
              { name: `- **<a:zAnim_blackbadge1:971068427491999814> Badges** :`, value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun'}` },
              { name: `- **<:DISCORD_invite:963888875955167276> Date de création du compte** :`, value: `<t:${Math.floor(user.createdAt / 1000)}:F>` },
              { name: `- **<:DISCORD_shield:963891927797870672> Rôles (${member.roles.cache.size})** :`, value: `${member.roles.cache.map(r => `${r}`).join(" ")}` },
              { name: `- **<:DISCORD_ticket:963890159726755850>  Surnom ** :`, value: `${user.username} ` },
              { name: `- **<:PEPE_peepoenter:971070149501280277> Arrivée sur le serveur** :`, value: `<t:${Math.floor(member.joinedAt / 1000)}:F>` },


            )
            Embed.setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

        } 
    
})