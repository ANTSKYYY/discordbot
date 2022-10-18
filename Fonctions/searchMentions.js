const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');

module.exports = async (message) => {




  const Embed = new MessageEmbed()
  .setColor('#f00020')
  .setTitle('💬 __**Attention !**__ 💬')
  .setURL('https://discord.gg/u8gsYrsg')
  .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
  .setDescription(`Attention ${message.author}, il n'est pas autorisés de mentionner plus de 5 personnes dans un seul même message !\nSois plus prudent la prochaine fois pour éviter d'être sanctionné !`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
  .setTimestamp()
  .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
  
  let content = message.content.split(" ")
  let count = 0;

  for(let i = 0; i < content.length; i++) {

      if(content[i].match(new RegExp(/<@!*&*[0-9]+>/))) count++;
 
  }

  if(count > 5) {

      await message.delete()
      await message.author.send({embeds: [Embed]})
  }
} 