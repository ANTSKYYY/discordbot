const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "chicken",
    description: "ta description",
    utilisation: "[mise] [nombre d'os]",
    alias: ["chicken"],
    permission: "Aucune",
    category: "<:DISCORD_casino:965186012919791627> | Casino",

    async run(bot, message, args, db) {


        let mise = message.user ? args._hoistedOptions[0].value : args[0]
        if(!mise) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Veuillez indiquer un nombre supérieur à `0` !", ephemeral: true})
        if(isNaN(mise)) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Vous devez entrer uniquement des chiffres ou nombres", ephemeral: true})
        if(parseInt(mise) <= 0) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Veuillez indiquer un nombre supérieur à `0` !", ephemeral: true})

        let bone = message.user ? args._hoistedOptions[1].value : args[1]
        if(!bone) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Veuillez indiquer un nombre supérieur à `0` et inférieur à `30` !", ephemeral: true})
        if(isNaN(bone)) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Vous devez entrer uniquement des chiffres ou nombres", ephemeral: true})
        if(parseInt(bone) <= 0 || parseInt(bone) >= 30) return message.reply({content: "<:ADiscord_Croix:963466511324950558> Veuillez indiquer un nombre supérieur à `0` et inférieur à `30` !", ephemeral: true})

        db.query(`SELECT * FROM casino WHERE userID = ${message.user.id}`, async (err, req) => {

            
                    
          
            if(parseInt(req[0].money) < parseInt(mise)) return message.reply({content: "Vous n'avez pas assès d'argent !", ephemeral: true});

            let toreveal = []
            let order = [];

            for (let i = 0; i < 25; i++) toreveal.push("🍽️")
            for (let i = 0; i < 25; i++) order.push("🍗")
            for (let i = 0; i < parseInt(bone); i++) {
                let good = false;
                let number = Math.floor(Math.random() * 25)
                if(order[number] === "🦴") {
                    for (let j = 0; j < 25; j++) {
                        if(good === true) return;
                        number = Math.floor(Math.random() * 25)
                        if(order[number] === "🍗") {
                            order[number] = "🦴";
                            good = true;
                        }
                    }
                } else order[number] = "🦴";
            }

            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setDescription(`${toreveal.slice(0, 5).join(" ")}\n${toreveal.slice(5, 10).join(" ")}\n${toreveal.slice(10, 15).join(" ")}\n${toreveal.slice(15, 20).join(" ")}\n${toreveal.slice(20, 25).join(" ")}`)
            .setTimestamp()
            .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setLabel("Réveler une assiette")
            .setEmoji("🍽️")
            .setCustomId(`reveal_${message.user ? message.user.id : message.author.id}`),
            new Discord.MessageButton()
            .setStyle("DANGER")
            .setLabel(`Récupérer vos ${mise} €`)
            .setEmoji("✨")
            .setCustomId(`recover_${message.user ? message.user.id : message.author.id}`))

            let msg = await message.reply({ content: `Vous avez misé \`${mise}\` € et vous avez mis un total de \`${bone}\` os ! Le but du jeu du poulet et de révéler le plus d'assiettes contenant du poulet sans tomber sur des os ! Que voulez-vous faire ?`, embeds: [Embed], components: [btn] })
            if(message.user) msg = await message.fetchReply()

            let towin = parseInt(mise)
            let multiplicator = parseInt(bone) < 10 ? 0 + (parseInt(bone) / 10) : parseInt(bone) < 20 ? 1 + ((parseInt(bone) - 10) / 10) : 2 + ((parseInt(bone) - 20) / 10)

            const filter = async () => true;
            const collector = msg.createMessageComponentCollector({ filter })

            collector.on("collect", async button => {

                if(button.user.id !== (message.user ? message.user.id : message.author.id)) return button.reply({ content: "Vous n'êtes pas l'auteur du message !", ephemeral: true })

                if(button.customId.includes("reveal")) {

                    let filter1 = m => m.author.id === button.user.id;

                    try {

                        let question = await button.reply({ content: "Veuillez indiquer le numéro de l'assiette que vous voulez révéler !", ephemeral: true })
                        let number = await (await message.channel.awaitMessages({ filter: filter1, max: 1, time: 120000, errors: [`time`] })).first()
                        try { await number.delete() } catch (err) { }
                        if(isNaN(number.content)) return button.editReply({ content: "Veuillez indiquer un nombre entre \`1\` et \`25\` inclus !", ephemeral: true })
                        if(parseInt(number.content) < 1 || parseInt(number.content) > 25) return button.editReply({ content: "Veuillez indiquer un nombre entre \`1\` et \`25\` inclus !", ephemeral: true })
                        if(toreveal[parseInt(number.content) - 1] !== "🍽️") return button.editReply({ content: "Vous avez déjà révélé cette assiette !", ephemeral: true })

                        let result = order[parseInt(number.content) - 1]
                        toreveal[parseInt(number.content) - 1] = result;
                        towin = Math.floor(towin + (parseInt(mise) * multiplicator));

                        let newEmbed = new Discord.MessageEmbed()
                        .setColor(bot.color)
                        .setDescription(`${toreveal.slice(0, 5).join(" ")}\n${toreveal.slice(5, 10).join(" ")}\n${toreveal.slice(10, 15).join(" ")}\n${toreveal.slice(15, 20).join(" ")}\n${toreveal.slice(20, 25).join(" ")}`)
                        .setTimestamp()
                        .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

                        const newbtn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                        .setStyle("PRIMARY")
                        .setLabel("Réveler une assiette")
                        .setEmoji("🍽️")
                        .setCustomId(`reveal_${message.user ? message.user.id : message.author.id}`),
                        new Discord.MessageButton()
                        .setStyle("DANGER")
                        .setLabel(`Récupérer vos ${towin} € !`)
                        .setEmoji("✨")
                        .setCustomId(`recover_${message.user ? message.user.id : message.author.id}`))

                        if(result === "🍗") {

                            await msg.edit({ content: `Bravo ! Vous avez révélé une assiette qui contenait \`🍗\` ! Vous ajoutez \`${Math.floor(parseInt(mise) * multiplicator)}\` € à vos gains ! Que voulez-vous faire ?`, embeds: [newEmbed], components: [newbtn] })
                        }

                        if(result === "🦴") {

                            await collector.stop()
                            db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = '${message.user.id}'`)

                            await msg.edit({ content: `Dommage ! Vous avez révélé une assiette contenant \`🦴\` ! Vous avez perdu, \`${mise}\` € vous ont été retirés !`, embeds: [newEmbed], components: [] })
                        }

                    } catch (err) {

                        return button.editReply({ content: "Vous avez mis trop de temps pour répondre à la question !", ephemeral: true })
                    }
                }

                if(button.customId.includes("recover")) {

                    await collector.stop()
                    if(parseInt(req[0].money) === parseInt(towin)){
                      await msg.edit({ content: `Vous avez annulé votre mise et recuperer vos ${mise}€`, embeds: [msg.embeds[0]], components: [] })
                    } else {
                      db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + towin}' WHERE userID = '${message.user.id}'`)

                      await msg.edit({ content: `Bravo ! Vous avez gagné, \`${towin}\` € vous ont été ajoutés !`, embeds: [msg.embeds[0]], components: [] })
                    }
                    
                }
            })
        })
    }
})