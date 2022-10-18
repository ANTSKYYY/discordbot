const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');
const date = require('date-and-time');

module.exports = new Command({

    name: "ban",
    description: "Permet de bannir définitivement un utilisateur",
    utilisation: "ban [membre] (raison)",
    alias: ["ban"],
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "<:DISCORD_shield:963891927797870672> | Modération",

    async run(bot, message, args, db) {

      let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
      if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");

        if(!reason) reason = "Aucune raison donnée";

        if (!message.guild.members.cache.get(user.id)) return message.reply({ content: "❌ Le joueur mentionné n'est pas sur le serveur !", ephemeral: true })

        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({ content: "Vous ne pouvez pas vous bannir vous-même !", ephemeral: true});

        if(user.id === message.guild.ownerId) return message.reply({content: "Vous ne pouvez pas bannir cette personne !", ephemeral: true}); 

        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({ content: "Vous ne pouvez pas expulser cette personne !", ephemeral: true})

        const banmp = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('⛔ __**Bannissement**__ ⛔')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('Vous avez été __bannis__ du serveur de Antskyyy !')
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

        const banlog = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('⛔ __**Nouveau Bannissement**__ ⛔')
        .setURL('https://discord.gg/u8gsYrsg')
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription('<@' + `${user.id}` + '>' + ' à été bannis du serveur !')
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
          await user.send({ embeds: [banmp]  });
          bot.channels.cache.get('907041387952877599').send({ embeds: [banlog]  })
        } catch (err) {}

        const ID = await bot.function.createID("BAN")

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Débannir")
        .setCustomId("unban")
        .setEmoji("🔓"))

        await message.reply({ content : '✅ Tu as banni <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true, components: [btn]}).then(async msg => {

            await message.guild.members.cache.get(user.id).ban({reason: `${reason} (Banni par ${message.user === undefined ? message.author.tag : message.user.tag})`})

            if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")

            const now = new Date();
                    date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
                    date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
                    date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
                    date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

                    const pattern = date.compile('le ddd, DD MMM YYYY à HH:mm');
                    date.format(now, pattern);
            let i = 0
            db.query(`SELECT * FROM user WHERE userID = ${user.id}`, async (err, req) => {
                let sql = `INSERT INTO bans (userID, authorID, banID, guildID, reason, date, time) VALUES (${user.id}, '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '906191168285597766', '${reason}', '${date.format(now, pattern)}', 'Définitif')`
                db.query(sql, function(err) {
                    if(err) throw err;
                })
               
            }) 
                
            
            db.query(`SELECT * FROM infractions WHERE userID = ${user.id}`, async (err, req) => {
                    let sqluser = `UPDATE infractions SET bans = '${parseInt(req[i].bans) + 1 }' WHERE userID = ${user.id}`
                db.query(sqluser, function(err) {
                    if(err) throw err;
                })
            })    
                
               
               
            const filter = async() => true;
            const collector = (message.user ? (await message.fetchReply()) : msg).createMessageComponentCollector({filter})

            collector.on("collect", async button => {

                if(!button.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return button.reply({content: "Vous n'avez pas la permission requise pour cliquer sur ce bouton !", ephemeral: true})

                
                if(button.customId === "unban") {

                    await message.guild.members.unban(user.id)
                    button.reply({content: "✅ Le joueur <@" + `${user.id}` + '> a bien été débannis !', ephemeral: true})
                    const btnf = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Succès !")
                    .setDisabled(true)
                    .setCustomId("unban")
                    .setEmoji("✅"));
                    
                    message.editReply({ 
                        content: `Débannissement de ` + '<@' + `${user.id}` + '>' + " effectué avec succès ! ✅",components: [btnf] 
                    });



                    var d = new Date,
                    dformat = [d.getHours(),
                    d.getMinutes(),].join(':');
    
                     const unbanlog = new MessageEmbed()
                    .setColor('#04FF00')
                    .setTitle('✔ __**Nouveau Débannissement**__ ✔')
                    .setURL('https://discord.gg/u8gsYrsg')
                    .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                    .setDescription('<@' + `${user.id}` + '>' + ' à été débannis du serveur !')
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
                    .addFields(
                        { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
                        { name: '__Heure :__', value: dformat}
                        
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });
                    const channel01 = bot.channels.cache.find(channel => channel.id === "907041387952877599");


                    bot.channels.cache.get('907041387952877599').send({ embeds: [unbanlog]  })


                    await collector.stop()
                }
            })
        })
    }
})