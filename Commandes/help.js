const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "help",
    description: "Permet de connaître toutes les commandes du robot",
    utilisation: "(commande)",
    permission: "Aucune",
    botpermission: [Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY, Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.EMBED_LINKS, Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
    category: "<:DISCORD_ticket:963890159726755850> | Information",

    async run(bot, message, args, db) {

        let command;
        if(args.length >= 1) {
            command = bot.commands.get(args[0])
            if(!command) return message.reply("Aucune commande trouvée !")
        } else command = undefined;

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guildId}`, async (err, req) => {
            
            if(!command) {
                
                let categories = [];
                let commands = bot.commands;
                
                commands.forEach((command) => {
                    if(!categories.includes(command.category)) categories.push(command.category)
                })
                
                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle("Toutes les commandes du bot")
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`<:ADiscord_Staff:963896942004412446> ● Préfixe du serveur : \`${req[0].prefix}\`\n<:ADiscord_Ticket:963890159726755850> ● Nombre de commandes : \`${bot.commands.size}\`\n<a:zAnim_Arrow_right:963464759078965248> ● Choisis la catégorie de commande de ton choix afin d'en savoir plus `)
                .setTimestamp()
                .setFooter({text: `${message.user ? message.user.username : message.author.username}`, iconURL: message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true})})
                
                let options = [];
                categories.forEach(async cat => options.push({value: cat, label: cat.split(" ")[1] + " " + cat.split(" ")[2], emoji: cat})) 
                
                const menu = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setCustomId("menuhelp").setMinValues(1).setMaxValues(1).setPlaceholder("En attente de votre choix...").addOptions(options))
                
                let msg = await message.reply({embeds: [Embed], components: [menu]})
                
                let filter = async() => true;
                const collector = (message.user ? (await message.fetchReply()) : msg).createMessageComponentCollector({filter, time: 120000})
                
                collector.on("collect", async menu => {
                    
                    if(menu.user.id !== (message.user ? message.user.id : message.author.id)) return menu.reply({content: "Vous n'êtes pas l'auteur du message !", ephemeral: true})
                    
                    let commands = bot.commands.filter(cmd => cmd.category === menu.values[0])
                    
                    let newEmbed = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle("Toutes les commandes du bot")
                    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                    .setDescription(`<:ADiscord_Staff:963896942004412446> ● Préfixe du serveur : \`${req[0].prefix}\`\n<:ADiscord_Ticket:963890159726755850> ● Nombre de commandes : \`${bot.commands.size}\`\n\n${commands.map(cmd => `\`${req[0].prefix}${cmd.name}\` <a:zAnim_Arrow_right:963464759078965248> ${cmd.description}`).join("\n")}`)
                    .setTimestamp()
                    .setFooter({text: `${message.user ? message.user.username : message.author.username}`, iconURL: message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true})})
                    
                    await menu.deferUpdate()
                    message.user ? await message.editReply({embeds: [newEmbed]}) : msg.edit({embeds: [newEmbed]})
                })
                
                collector.on("end", async () => {
                    
                    
                    let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle("Toutes les commandes du bot")
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`<:ADiscord_Staff:963896942004412446> ● Préfixe du serveur : \`${req[0].prefix}\`\n<:ADiscord_Ticket:963890159726755850> ● Nombre de commandes : \`${bot.commands.size}\`\n<a:zAnim_Arrow_right:963464759078965248> ● Le temps est écoulé, relance la commande si tu le souhaite.`)
                .setTimestamp()
                .setFooter({text: `${message.user ? message.user.username : message.author.username}`, iconURL: message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true})})
                    await message.editReply({embeds: [Embed], components: []})
                })
                
            } else {
                
                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle(`Informations sur la commande ${command.name}`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Nom de la commande : \`${command.name}\`\nDescription de la commande : \`${command.description}\`\nUtilisation de la commande : \`${req[0].prefix}${command.name} ${command.utilisation}\`\nCatégorie de la commande : \`${command.category}\`\nPermission de la commande : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.Permissions(command.permission).toArray(false)}\`\nPermissions requise pour le robot : ${command.botpermission.map(permission => `\`${new Discord.Permissions(permission).toArray(false)}\``).join(" ")}`)
                .setTimestamp()
                .setFooter({text: `${message.user ? message.user.username : message.author.username}`, iconURL: message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true})})
                
                message.reply({embeds: [Embed]})
            }
        })
    }
})