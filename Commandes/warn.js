const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js')
const date = require('date-and-time');

module.exports = new Command({

    name: "warn",
    description: "Permet d'avertir un utilisateur",
    utilisation: "[membre] (raison)",
    alias: ["warn", "warning"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "<:DISCORD_shield:963891927797870672> | Modération",

    async run(bot, message, args, db) {

        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.KICK_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
        
        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)

        if(!user) return message.reply({ content : "Aucune personne trouvée !", ephemeral: true})

        if(!message.guild.members.cache.get(user.id)) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        

        if(!reason) reason = "Aucune raison donnée ( Contacte <@709330933878095887> pour toute révoquation du warn ! )";

        if (!message.guild.members.cache.get(user.id)) return message.reply({ content: "❌ Le joueur mentionné n'est pas sur le serveur !", ephemeral: true })

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({content: "Vous ne pouvez pas vous avertir vous-même !", ephemeral: true})

        if(user.id === message.guild.ownerId) return message.reply({content: "Vous ne pouvez pas avertir cette personne !", ephemeral:true})

        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({content: "Vous ne pouvez pas avertir cette personne !", ephemeral: true})

        const ID = await bot.function.createID("WARN")


















        const warnmp = new MessageEmbed()
        .setColor('#ffff00')
        .setTitle('⚠ __**Avertissement**__ ⚠')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('Vous avez été __avertis__ sur le serveur de Antskyyy !')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
        .addFields(
            { name: '__Raison :__', value: `*${reason}*\n( Contacte <@709330933878095887> pour toute révoquation du bannissement )` },
            { name: '__Que faire ?__', value: "Il serait intelligent d'aller consulter les <#906191168285597771> du serveur afin de comprendre pourquoi vous avez été avertis !" },
            { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
            
        )
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' 
    });
    
    



    var d = new Date,
    dformat = [d.getHours(),
    d.getMinutes(),].join(':');

        const warnog = new MessageEmbed()
        .setColor('#ffff00')
        .setTitle('⚠ __**Nouvelle Avertissement**__ ⚠')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('<@' + `${user.id}` + '>' + ' à été avertis sur serveur !')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
        .addFields(
            { name: '__Raison :__', value: `*${reason}*` },
            { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
            { name: '__Heure :__', value: dformat}
            
        )
        .setTimestamp()
        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });








        




















        
        try {
          await user.send({ embeds: [warnmp]  });
          bot.channels.cache.get('907041273238650951').send({ embeds: [warnog]  })
        } catch (err) {}
        await message.reply({ content : '✅ Tu as averti <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true})

        const now = new Date();
          date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
          date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
          date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
          date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

          const pattern = date.compile('le ddd, DD MMM YYYY à HH:mm');
          date.format(now, pattern);

        let sql = `INSERT INTO warns (userID, authorID, warnID, guildID, reason, date) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '906191168285597766', '${reason}', '${date.format(now, pattern)}')`
        db.query(sql, function(err) {
            if(err) throw err;
        })
        let i = 0;
        db.query(`SELECT * FROM infractions WHERE userID = ${user.id}`, async (err, req) => {
            let sqluser = `UPDATE infractions SET warns = '${parseInt(req[i].warns) + 1 }' WHERE userID = ${user.id}`
        db.query(sqluser, function(err) {
            if(err) throw err;
        })
    })  
    }
})