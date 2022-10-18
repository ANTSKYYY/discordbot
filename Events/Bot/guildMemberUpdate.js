const Discord = require("discord.js")
const Event = require("../../Structure/Event")

module.exports = new Event("guildMemberUpdate", async (bot, oldMember, newMember) => {

    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince;

    if(!oldStatus && newStatus) {
        let Boost = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("__**Merci du boost**__")
        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg'}) 
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription(`Merci de ton boost ${newMember.user} ! 🚀`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.png?size=256`)
        .setImage('https://cdn.discordapp.com/attachments/897595945531867146/906185101933686794/5fc1f8cf89ea4cfa8bbc77eb1ba2ce31.jpeg')

        await bot.channels.cache.get("906191168285597773").send({embeds: [Boost]})
    }
})