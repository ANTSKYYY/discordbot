const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "mute",
    description: "Permet de rendre muet un utilisateur",
    description: "Permet de rendre temporairement muet un utilisateur",
    utilisation: "[membre] (raison)",
    alias: ["mute"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    alias: ["mute", "tempmute"],
    category: "<:DISCORD_shield:963891927797870672> | Modération",
    
    async run(bot, message, args, db) {


      let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
      if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

        let time = message.user ? args._hoistedOptions[1].value : args[1]
        if(!time) return message.reply("Veuillez un indiquer une durée !")
        if(!parseInt(ms(time))) return message.reply("Le temps indiqué est invalide !")
        if(ms(time) > 2419200000) return message.reply("Le temps ne doit pas être supérieur à 28 jours !")

        let reason = message.user ? (args._hoistedOptions.length > 2 ? args._hoistedOptions[2].value : undefined) : args.slice(2).join(" ");
       
        if(!reason) reason = "Aucune raison donnée !";

        if (!message.guild.members.cache.get(user.id)) return message.reply({ content: "❌ Le joueur mentionné n'est pas sur le serveur !", ephemeral: true })

        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MUTE_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("Vous ne pouvez pas vous rendre muet vous-même !")
        if(user.id === message.guild.ownerId) return message.reply("Vous ne pouvez pas rendre muet cette personne !")

        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("Vous ne pouvez pas rendre muet cette personne !")

        if(message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply("Cette personne est déjà muette !")

        



        const mutemp = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('🔇 __**Mute**__ 🔇')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('Vous avez été __mute__ du serveur de Antskyyy !')
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

        const mutelog = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('🔇 __**Nouveau Mute**__ 🔇')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('<@' + `${user.id}` + '>' + ' à été mute du serveur !')
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

          await user.send({ embeds: [mutemp]  });
          bot.channels.cache.get('964255165588836432').send({ embeds: [mutelog]  })
          
        } catch (err) {}

        const ID = await bot.function.createID("MUTE")

        let sql = `INSERT INTO mutes (userID, authorID, muteID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${Date.now()}', '${time}')`
        db.query(sql, function(err) {
            if(err) throw err;
        }),
        
         db.query(`SELECT * FROM infractions WHERE userID = ${user.id}`, async (err, req) => {
            	let i = 0;
                let sqluser = `UPDATE infractions SET mutes = '${parseInt(req[i].mutes) + 1 }' WHERE userID = ${user.id}`
                db.query(sqluser, function(err) {
                	if(err) throw err;
                })
         })       
            	    
          
             
        
        await message.reply({ content : '✅ Tu as mute <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true})
        await message.guild.members.cache.get(user.id).timeout(ms(time), reason)
        
    }
}) 