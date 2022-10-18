const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    utilisation: "[nombre de messages]",
    alias: ["clear", "delete"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "<:DISCORD_shield:963891927797870672> | Modération",
    cooldown: 10,

    async run(bot, message, args, db) {

        try {
            if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.KICK_MEMBERS))) return message.reply({ content:"<:DISCORD_cross:963466511324950558> Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
            let number = args[0] || args._hoistedOptions[0].value
            if(isNaN(number)) return message.reply({content:"<:DISCORD_cross:963466511324950558> Veuillez indiquer un nombre entre `0` et `100` !", ephemeral: true})
            if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({content:"<:DISCORD_cross:963466511324950558> Veuillez indiquer un nombre entre `0` et `100` !", ephemeral: true})

            try {await message.delete()} catch (err) {}
            message.channel.bulkDelete(number).catch(async err => {
                

            }).then(async msg => {

                try {
                    await message.reply(`${message.author === undefined ? message.user : message.author} a supprimé \`${msg.size}\` messages avec succès !`)
                } catch (err) {
                    return message.reply({content: `
<:DISCORD_cross:963466511324950558> Les messages datent de plus de 14 jours !`, ephemeral: true})
                }
            })

        } catch (err) {

           return message.reply({content: `
<:DISCORD_cross:963466511324950558> Les messages datent de plus de 14 jours !`, ephemeral: true})
        }
    }
})