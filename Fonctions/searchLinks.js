const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');

module.exports = async (message, member, bot, db) => {


  if(message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MANAGE_MESSAGES))) return;

  if(message.author.bot)return;

  

  const Embed = new MessageEmbed()
  .setColor('#f00020')
  .setTitle('💬 __**Attention !**__ 💬')
  .setURL('https://discord.gg/u8gsYrsg')
  .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
  .setDescription(`Attention ${message.author}, les liens ne sont pas acceptés dans ce salon !\nSois plus prudent la prochaine fois pour éviter d'être sanctionné !`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
  .setTimestamp()
  .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })

  const Embed2 = new MessageEmbed()
  .setColor('#f00020')
  .setTitle('💬 __**Logs lien !**__ 💬')
  .setURL('https://discord.gg/u8gsYrsg')
  .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
  .setDescription(`${message.author}, Vient d'envoyer un lien\n`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
  .setTimestamp()
  .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })

  if(message.content.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g))) {

      await message.delete()

      await message.author.send({ embeds: [Embed] })


     
  }


} 