const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');
const date = require('date-and-time');

module.exports = new Command({

    name: "kick",
    description: "Permet d'expulser un utilisateur",
    utilisation: "kick [membre] (raison)",
    permission: Discord.Permissions.FLAGS.KICK_MEMBERS,
    category: "<:DISCORD_shield:963891927797870672> | Modération",

    async run(bot, message, args, db) {
        
        if (message.user) {
            let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
            if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

            
            
            let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
            
            if(!reason) reason = "Aucune raison donnée ( Contacte <@709330933878095887> pour toute révoquation du kick ! ) ";

            if (!message.guild.members.cache.get(user.id)) return message.reply({ content: "❌ Le joueur mentionné n'est pas sur le serveur !", ephemeral: true })

            if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.KICK_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

            if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({content: "Vous ne pouvez pas vous expulser vous-même !", ephemeral: true})

            if(user.id === message.guild.ownerId) return message.reply({content: "Vous ne pouvez pas expulser cette personne !", ephemeral: true})

            if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({ content:"Vous ne pouvez pas expulser cette personne !", ephemeral: true})
            





            const kickmp = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('💨 __**Expulsion**__ 💨')
                .setURL('https://discord.gg/u8gsYrsg')
                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                .setDescription('Vous avez été __explusé__ du serveur de Antskyyy !')
                .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
                .addFields(
                    { name: '__Raison :__', value: `*${reason}*\n( Contacte <@709330933878095887> pour toute révoquation du bannissement )` },
                    { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
                    
                )
                .setTimestamp()
                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' 
            });
            
            



            var d = new Date,
            dformat = [d.getHours(),
            d.getMinutes(),].join(':');

                const kicklog = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('💨 __**Nouvelle Expulsion**__ 💨')
                .setURL('https://discord.gg/u8gsYrsg')
                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                .setDescription('<@' + `${user.id}` + '>' + ' à été kick du serveur !')
                .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
                .addFields(
                    { name: '__Raison :__', value: `*${reason}*` },
                    { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
                    { name: '__Heure :__', value: dformat}
                    
                )
                .setTimestamp()
                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });






























                const now = new Date();
                date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
                date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
                date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
                date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

                const pattern = date.compile('le ddd, DD MMM YYYY à HH:mm');
                date.format(now, pattern);

                const ID = await bot.function.createID("KICK")
            try {
                await user.send({ embeds: [kickmp]  });
                bot.channels.cache.get('907041387952877599').send({ embeds: [kicklog]  })
            } catch (err) {}
            await message.reply({ content : '✅ Tu as expulsé <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true})

            await message.guild.members.cache.get(user.id).kick({reason: `${reason} (Banni par ${message.user === undefined ? message.author.tag : message.user.tag})`})
			try{
                let sql = `INSERT INTO kicks (userID, authorID, kickID, guildID, reason, date) VALUES(${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '906191168285597766', '${reason}', '${date.format(now, pattern)}')`
                db.query(sql, function(err) {
                    if(err) throw err;
                })
            } catch (err)  {}  
            let i = 0;
        db.query(`SELECT * FROM infractions WHERE userID = ${user.id}`, async (err, req) => {
            let sqluser = `UPDATE infractions SET kicks = '${parseInt(req[i].kicks) + 1 }' WHERE userID = ${user.id}`
        db.query(sqluser, function(err) {
            if(err) throw err;
        })
    })  
        }    
    }
})