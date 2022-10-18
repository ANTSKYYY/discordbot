const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "restart",
    description: "Permet de redémarrer le bot",
    utilisation: "",
    alias: ["restart"],
    permission: "Développeur",
    category: "<:DISCORD_staff:963896942004412446> | Système",
    cooldown: 10,

    async run(bot, message, args, db) {
        
        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
        await message.reply({ content: "Le bot a été redémarré avec succès ! ✅", ephemeral: true})

        await require("child_process").execSync("pm2 restart main")
    }
})