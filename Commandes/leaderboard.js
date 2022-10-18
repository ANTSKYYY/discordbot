const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "leaderboard",
    description: "Permet de connaître les 10 utilisateurs avec le plus d'expérience",
    utilisation: "",
    alias: ["leaderboard"],
    permission: "Aucune",
    category: "<:mariolevelup:964639440054136852> | Expérience",

    async run(bot, message, args, db, interaction) {
        await message.reply({content: `⌚ En cours▪▪▪`}).then(async msg => {
          db.query(`SELECT * FROM user ORDER BY level DESC, xp DESC;`, async(err, req) => {

            const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setColorFont(bot.color)
            .setBackground("./canvas.jpeg")

            if(req.length < 10) {
              
              for(let i = 0; i < req.length; i++) {

                Leaderboard.addUser(bot.users.cache.get(req[i].userID), parseInt(req[i].level), parseInt(req[i].xp), ((parseInt(req[i].level) + 1) * 1000))
              }

            } else {
            
              for(let i = 0; i < 10; i++) {

                Leaderboard.addUser(bot.users.cache.get(req[i].userID), parseInt(req[i].level), parseInt(req[i].xp), ((parseInt(req[i].level) + 1) * 1000))
              }

            }

            const leaderboard = (await Leaderboard.toLeaderboard()).toBuffer()

            const attachment = new Discord.MessageAttachment(leaderboard, 'leaderboard.png')
            
          try {

            msg.edit({content: `Et voila <@${message.author.id}>`, files: [attachment]})
          } catch (err) {
            message.editReply({content: null, files: [attachment]})
          }
      })
      })

}})