const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js');

module.exports = new Command({

    name: "unban",
    description: "Permet de débannir un utilisateur",
    utilisation: "[id du membre] (raison)",
    alias: ["unban"],
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "<:DISCORD_shield:963891927797870672> | Modération",
    cooldown: 10,

    async run(bot, message, args, db) {
        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
      if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "*Aucune raison donnée*";

        if((await message.guild.bans.fetch(message.user ? args._hoistedOptions[0].value : args[0])).size === 0) return message.reply({ content: "❌ Aucune personne trouvée dans les bannissements !", ephemeral: true})






        





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
                { name: '__Raison :__', value: `*${reason}*` },
                { name: '__Auteur :__', value: `**` + '<@' + `${message.user.id}` + '>' + '**'},
                { name: '__Heure :__', value: dformat}
                
            )
            .setTimestamp()
            .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });
            const channel01 = bot.channels.cache.find(channel => channel.id === "907041387952877599");

            bot.channels.cache.get('907041387952877599').send({ embeds: [unbanlog]  })      
            await message.reply({ content : '✅ Tu as débanni <@' + `${user.id}` + '>' + ` pour la raison : *${reason}*  ✅`, ephemeral: true})
        





        message.guild.members.unban(message.user ? args._hoistedOptions[0].value : args[0])
    }
})