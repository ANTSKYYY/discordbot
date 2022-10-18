const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "rule",
    description: "Permet d'envoyer l'embed des règles",
    utilisation: "",
    alias: ["rule"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "<:DISCORD_staff:963896942004412446> | Système",
    cooldown: 10,

    async run(bot, message, args, db) {
      
        
        
        const Embed = new MessageEmbed()
        .setColor(bot.color)
        .setTitle('📜 __**Réglement**__ 📜')
        .setURL('https://discord.gg/y88THdFcud')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
        .setDescription("__**Le règlement du serveur de Antskyyy est simple :**__\n\n La modération se réserve le droit de sanctionner toute personne dont le comportement serait jugé **néfaste**. Ce règlement s'applique __à tous les salons vocaux ou textuels, emojis, pseudos, avatars, statuts, messages privés et est considéré comme lu et approuvé dès votre arrivée__.\n\n")
        .addFields(
          { name: '- La parole', value: '> :blue_circle: : Prenez soin de vous exprimer uniquement par des commentaires constructifs, nous ne tolérons pas les messages **vulgaires**, **insultants** ou **abusifs**.', inline: false },
          { name: '- Le spam', value: '> :blue_circle: : Tout spam abusif dans un salon vocal ou textuel est **interdit**', inline: false },
          { name: '- Sujets Sensibles', value: "> :blue_circle:  : Tout sujet portant sur la pornographie, le racisme, la drogue, l'orientation sur l'âge ou le sexe d'une personne n'est pas **toléré**.", inline: false },
          { name: '- Le spoil', value: '> :blue_circle:  : Tout spoil, peu importe le sujet est strictement **interdit**', inline: false },
          { name: '- Le respect', value: "> :blue_circle:  : Le respect du serveur et de ses membres est à ne pas négliger, toute pub d'une autre chaîne twitch, youtube, un autre serveur discord ou un site est **formellement interdite**", inline: false },
          { name: "- L'administration", value: "> :blue_circle:  : La modération a toujours raison, chaque décision est absolue et incontestable, si vous souhaitez vous plaindre d'un modérateur, vous pouvez envoyer un message privé à un **administrateur**.", inline: false },
          { name: "- Le bot", value: "> :blue_circle:  : Pour des raisons de visibilité, l'utilisation de bots se fait dans le salon** <#962608777717223454>**", inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true})}) 
       
        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Accepter le reglement")
        .setEmoji({name: "Verifier", id:'906651073102618686'})
        .setCustomId("rule"));

        message.author ? await message.delete() : await message.deferReply() && await message.deleteReply();
        await message.channel.send({embeds: [Embed], components: [btn]})
      
                        
                                
    }
})