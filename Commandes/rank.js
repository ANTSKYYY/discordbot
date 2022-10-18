const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "rank",
    description: "Permet de connaitre l'expérience d'un utilisateur",
    utilisation: "(membre)",
    alias: ["rank", "level"],
    permission: "Aucune",
    category: "<:mariolevelup:964639440054136852> | Expérience",
    cooldown: 5,

    async run(bot, message, args, db) {

        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : (args._hoistedOptions.length === 0 ? message.user : bot.users.cache.get(args._hoistedOptions[0].value))
        if(!user) user = message.author;
        await message.reply({ content: `En cours...`}).then(async msg => {

            db.query(`SELECT * FROM user WHERE userID = ${user.id}`, async (err, req) => {

                if(req.length < 1) {
                    try {
                        message.editReply(`❌ ${user} n'est pas enregistré !`)
                        return;
                    } catch (err) {
                        msg.edit(`❌ ${user} n'est pas enregistré !`)
                        return;
                    }
                }
    
                const calculXp = async (xp, level) => {
    
                    let xptotal = 0;
    
                    for(let i = 0; i < (level + 1); i++) {
    
                        xptotal = xptotal + (i * 1000)
                    }
    
                    xptotal = xptotal + xp
    
                    return xptotal;
                }
    
                db.query(`SELECT * FROM user ORDER BY level DESC, xp DESC`, async (err, all) => {
    				
                    const leaderboard = all.sort((a, b) => calculXp(b.xp, b.level) - calculXp(a.xp, a.level))
                     const rank = leaderboard.findIndex(u => u.userID === user.id) + 1;
                    
                
    			
                    const Rank = await new Canvas.Card()
                    .setBot(bot)
                    .setBackground("./canvas.jpeg")
                    .setGuild(message.guild)
                    .setUser(user)
                   	.setRank(rank)
                    
                    .setXp(parseInt(req[0].xp))
                    .setXpNeed((parseInt(req[0].level) + 1) * 1000)
                    .setLevel(parseInt(req[0].level))
                    .setColorFont(bot.color)
                    .setColorProgressBar("#66A3D9")
                    .toCard()
    
                    const attachment = new Discord.MessageAttachment(Rank.toBuffer(), 'rank.png')
    
                    try {
                            msg.edit({content: `✅ Voici le score de ${user} ! 📈`, files: [attachment]})
                    } catch (err) {
                        message.editReply({content: `✅ Voici le score de ${user} ! 📈`, files: [attachment]})

                    }
                       
                })
                
            })
        })
    }
})