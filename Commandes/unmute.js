const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "unmute",
    description: "Permet de rendre la parole d'un utilisateur",
    utilisation: "[membre] (raison)",
    alias: ["unmute"],
    permission: Discord.Permissions.FLAGS.MODERATE_MEMBERS,
    category: "<:DISCORD_shield:963891927797870672> | Modération",
    cooldown: 10,

    async run(bot, message, args, db) {

      let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
      if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ")
        if(!reason) reason = "Aucune raison donnée";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({content: "Vous ne pouvez pas vous rendre votre propre parole !", ephemeral: true})
        
        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MUTE_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        if(user.id === message.guild.ownerId) return message.reply({content: "Vous ne pouvez pas rendre la parole de cette personne !", ephemeral: true})
        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({content: "Vous ne pouvez pas rendre la parole de cette personne !", ephemeral: true})
        if(!message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply({content:"Cette personne a déjà sa parole !", ephemeral: true})


        const unmutemp = new MessageEmbed()
        .setColor('#008000')
        .setTitle('🔊 __**Unmute**__ 🔊')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('Vous avez été __unmute__ du serveur de Antskyyy !')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
        .addFields(
            { name: '__Raison :__', value: `*${reason}*` },
            { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
            
        )
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' 
        })



        var d = new Date,
        dformat = [d.getHours(),
        d.getMinutes(),].join(':');

        const unmutelog = new MessageEmbed()
        .setColor('#008000')
        .setTitle('🔊 __**Nouveau unmute**__ 🔊')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('<@' + `${user.id}` + '>' + ' à été unmute du serveur !')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
        .addFields(
            { name: '__Raison :__', value: `*${reason}*` },
            { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
            { name: '__Heure :__', value: dformat}
            
        )
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });


        const channel01 = bot.channels.cache.find(channel => channel.id === "907041387952877599");



        try {
          await user.send({ embeds: [unmutemp]  });
          bot.channels.cache.get('964255165588836432').send({ embeds: [unmutelog]  })
        } catch (err) {}

        await message.reply({ content : '✅ Tu as unmute <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true})
        message.guild.members.cache.get(user.id).timeout(null, `${reason} (Parole rendu par ${message.user === undefined ? message.author.tag : message.user.tag})`)
        
    }
}) 