const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'blacklist',
	description: "Permet d'ajouter des mots blacklist sur le serveur ",
  category: "<:DISCORD_shield:963891927797870672> | Modération",
	async run(bot, message, args, member) { 

    const db = bot.db;

    


    if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

    const mot = message.user ? args._hoistedOptions[1].value : args[1]
    let user = message.author
    let choice = message.user ? args._hoistedOptions[0].value : args[0]


    db.query(`SELECT * FROM blacklist WHERE guildID = ?`, [message.guild.id], async (err, req) => {

      if(choice === 'add'){

                  
                
                const words = req.map(r => r.word);
                if (words.includes(message.user ? args._hoistedOptions[1].value : args[1])) {
                    return message.reply({content: `<:DISCORD_cross:963466511324950558> Le mot \`\`${message.user ? args._hoistedOptions[1].value : args[1]}\`\` est déjà enregistrer dans la base de donnée.`, ephemeral: true});
                } else {
                  let sql = `INSERT INTO blacklist (guildID, word) VALUES ('${message.guildId}', '${mot}')`
                  db.query(sql, function(err) {
                      if(err) throw err;
                  })
                  message.reply({content: `<:DISCORD_check:963466510242832544> Le mot ` + "`" + `${mot}` + "`" + ` à été ajouté au serveur en tant que blacklist !`, ephemeral: true});
                }
      
              } else if(choice === "remove"){

                db.query(`SELECT * FROM blacklist WHERE word = '${mot}'`, async (err, req) => {
                    const words = req.map(r => r.word);
                    if (!words.includes(message.user ? args._hoistedOptions[1].value : args[1])) {
                        return message.reply({content: `<:DISCORD_cross:963466511324950558> Le mot \`\`${message.user ? args._hoistedOptions[1].value : args[1]}\`\` n'est pas dans la base de donnée.`, ephemeral: true});
                    } else if(words.includes(message.user ? args._hoistedOptions[1].value : args[1])){
                      db.query(`DELETE FROM blacklist WHERE word = '${mot}'`)
                      message.reply({content: `<:DISCORD_check:963466510242832544> Le mot ` + "`" + `${mot}` + "`" + ` bien été retiré du serveur en tant que blacklist !`, ephemeral: true});
                    }
                  })    
               } 
              
            })          
	}
}