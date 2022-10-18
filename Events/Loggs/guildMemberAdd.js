const Discord = require("discord.js")
const Canvas = require("canvas")
const Event = require("../../Structure/Event")
const { MessageEmbed } = require('discord.js');
const date = require('date-and-time');
module.exports = new Event("guildMemberAdd", async (bot, member) => {




    const db = bot.db;


             
                        db.query(`SELECT * FROM serveur WHERE guildID = ${member.guild.id}`, async (err, req) => {


                                    if(req.length < 1) return;

                                    if(req[0].raid === "on") {

                                        try {
                                            
                                            const raidmp = new MessageEmbed()
                                            .setColor('#FF0000')
                                            .setTitle('<:DISCORD_staff:963896942004412446> __**Expulsé !**__ <:DISCORD_staff:963896942004412446>')
                                            .setURL('https://discord.gg/u8gsYrsg')
                                            .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                            .setDescription("__**Le serveur vient de passer en mode Anti-raid !**__  \nTu as donc été expulsé du serveur par **precaution**\nCela permet d'eviter toute dégradation du serveur\nPour que tu puisse retourner sur le serveur __**sans bug ni risque.**__\nPour l'instant , la seule chose à faire est d'essayer toutes les heures de rejoindre le serveur , si tu est encore kick c'est que c'est encore **activé** sinon bonne continuation sur le **serveur** !")
                                            .addFields(
                                                {name: "Essaye de rejoindre:", value: "[👉Clique ici👈](https://discord.gg/y88THdFcud)"}
                                            )
                                            .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png?size=256`)
                                            .setTimestamp()
                                            .setFooter({ text: 'Merci de ta compréhension !', iconURL: 'https://i.imgur.com/DIapvsK.jpg'})
                                            await member.user.send({embeds: [raidmp]})
                                            await member.kick("Mode anti-raid activé")
                                        } catch (err) {}
                                    
                                    } else {
                                


                                        var canvas = Canvas.createCanvas(1024, 500);

                                        ctx = canvas.getContext("2d")

                                        var background = await Canvas.loadImage("./canvas.jpeg");
                                        ctx.drawImage(background, 0, 0, 1024, 500);
                                        ctx.beginPath();
                                        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
                                        ctx.stroke()
                                        ctx.fill()
                                        ctx.strokeStyle = '#0099ff';
                                        ctx.strokeRect(0, 0, canvas.width, canvas.height);

                                        const welcomechannel = bot.channels.cache.get('908443726576246784')

                                        ctx.font = "72px Impact";
                                        ctx.fillStyle = "#ffffff";
                                        ctx.textAlign = "center";
                                        ctx.fillText(member.user.tag.toUpperCase(), 512, 385);

                                        canvas.context.font = '52px sans serif'
                                        canvas.context.fillText(`Il est le ${member.guild.memberCount}ème !`, 512, 455)
                                        ctx.beginPath();
                                        ctx.arc(512, 166, 119, 0, Math.PI * 2);
                                        ctx.closePath();
                                        ctx.clip();


                                        var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
                                            format: "png",
                                            size: 1024
                                        }))


                                        ctx.drawImage(avatar, 393, 47, 238, 238)

                                        var attachment = await new Discord.MessageAttachment(canvas.toBuffer(), "bienvenue.jpeg");

                                            const canvabienvenue = new MessageEmbed()
                                            .setColor('#FFFF00')
                                            .setTitle('👋 __**Bienvenue !**__ 👋')
                                            .setURL('https://discord.gg/u8gsYrsg')
                                            .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                            .setDescription("Salut " + '<@' + `${member.user.id}` + '>' + ", bienvenue sur le serveur d' Antskyyy\nÉclate toi bien et pense à checker les <#906191168285597771> ! ")
                                            .setTimestamp()
                                            .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                            .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })



                                            const captchaall = new MessageEmbed()
                                            .setColor('#FFFF00')
                                            .setTitle('🔐 __**Captcha Déja verifié !**__ 🔐')
                                            .setURL('https://discord.gg/u8gsYrsg')
                                            .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                            .setDescription("Salut " + '<@' + `${member.user.id}` + '>' + " Vu que tu as déja passé le captcha, tu n'as plus a le repasser , en esperant que tu n'est pas un robot 😁 ")
                                            .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                            .setTimestamp()
                                            .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })


                                                            
                                                        db.query(`SELECT * FROM infractions WHERE userID = ${member.user.id}`, async (err, req) => {

                                                            if(req.length < 1) {
                                                    
                                                                let sql = `INSERT INTO infractions (userID,bans,kicks,warns, mutes) VALUES (${member.user.id},'0','0','0', '0')`
                                                                db.query(sql, function(err) {
                                                                    if(err) throw err;
                                                                })
                                                    
                                                            }
                                                        })    



                                                        
                                        db.query(`SELECT * FROM serveur WHERE guildID = ${member.guild.id}`, async (err, req) => {

                                            if(req.length < 1) return;
                                            
                                            

                                            if(req[0].captcha === "on") {

                                                db.query(`SELECT * FROM user WHERE userID = ${member.user.id}`, async (err, req) => {
                                                    
                                                    if(req.length < 1 || req[0].captcha === "raté" ) {
                                                        let text = await bot.function.createCaptcha();

                                                        Canvas.registerFont("./node_modules/discord-canvas-easy/Assets/futura-bold.ttf", { family: "Futura Book"})
                                                        
                                                        const canvas = Canvas.createCanvas(300, 150)
                                                        const ctx = canvas.getContext("2d");

                                                        ctx.font = '35px "Futura Book"';
                                                        ctx.fillStyle = "#ffffff";
                                                        ctx.fillText(text, (150 - (ctx.measureText(`${text}`).width) / 2), 85)

                                                        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                                                        .setStyle("SUCCESS")
                                                        .setCustomId("valided")
                                                        .setLabel("Valider")
                                                        .setEmoji("✅"))
                                                                
                                                                const captchaembed = new MessageEmbed()
                                                                .setColor('#FFFF00')
                                                                .setTitle('🔐 __**Captcha**__ 🔐')
                                                                .setURL('https://discord.gg/u8gsYrsg')
                                                                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                .setDescription('<@' + `${member.user.id}` + '>' + ' Tu dois compléter le captcha ci dessous en tapant le code affiché en tenant compte des minuscules et des majuscules\nPuis , clique sur le petit bouton ✅ ! ')
                                                                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                .setTimestamp()
                                                                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })


                                                                const captchar = new MessageEmbed()
                                                                .setColor('#90EE90')
                                                                .setTitle('✅ __**Captcha Réussi !**__ ✅')
                                                                .setURL('https://discord.gg/u8gsYrsg')
                                                                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                .setDescription('<@' + `${member.user.id}` + '>' + " Lis bien les <#906191168285597771> et éclate toi sur le serveur ! \nD'ailleurs , vu que tu as passé le captcha une fois tu n'aura plus à le repasser !")
                                                                .setTimestamp()
                                                                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })

                                                                const captchaf = new MessageEmbed()
                                                                .setColor('#f00020')
                                                                .setTitle('🔐 __**Captcha Raté !**__ 🔐')
                                                                .setURL('https://discord.gg/u8gsYrsg')
                                                                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                .setDescription('<@' + `${member.user.id}` + '>' + " réessaye en n'oubliant pas les majuscules et les potentielles chiffres dans le captcha\nEnsuite , envoie le code du captcha puis clique sur le petit bouton ✅ ! \nRetenter le captcha : 👉 https://discord.gg/y88THdFcud 👈")
                                                                .setTimestamp()
                                                                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })

                                                                const now = new Date();
                                                                date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
                                                                date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
                                                                date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
                                                                date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

                                                                const pattern = date.compile('le ddd, DD MMM YYYY à HH:mm');
                                                                date.format(now, pattern);   
                                                        
                                                                const captcharf = new MessageEmbed()
                                                                .setColor('#90EE90')
                                                                .setTitle('✅ __**Captcha Réussi !**__ ✅')
                                                                .setURL('https://discord.gg/u8gsYrsg')
                                                                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                .setDescription('<@' + `${member.user.id}` + '>' + " à réussi le captcha " + `**${date.format(now, pattern)}**`)
                                                                .setTimestamp()
                                                                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                                                                
                                                                
                                                    db.query(`SELECT * FROM serveur WHERE guildID = ${member.guild.id}`, async (err, req) => {  
                                                        let msg = await bot.channels.cache.get(req[0].captcha_channel).send({ embeds: [captchaembed], components: [btn], files: [canvas.toBuffer()]})
                                                                
                                                        
                                                        let finalmessage;
                                                        let valided = false;
                                                        const filter = m => m.author.id === member.user.id;
                                                        const collectorm = msg.channel.createMessageCollector({filter, time: 120000})
                                                        const filter2 = async() => true;
                                                        const collectorb = msg.createMessageComponentCollector({filter2, time: 120000})


                                                        collectorm.on("collect", async message => {

                                                            finalmessage = message.content;
                                                        })
                                                    
                                                        collectorb.on("collect", async button => {
                                            
                                                            if(button.user.id !== member.user.id) return button.reply({content: "Vous n'êtes pas l'auteur du message !", ephemeral: true})
                                            
                                                            if(finalmessage === text) {
                                            
                                                                valided = true;
                                                                await collectorb.stop()
                                                                await collectorm.stop()
                                            
                                                                const btnf = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                                                                .setStyle("SUCCESS")
                                                                .setLabel("Succès !")
                                                                .setDisabled(true)
                                                                .setCustomId("captcha")
                                                                .setEmoji("✅"));
                                            

                                                                
                                                                if(button.customId === "captcha") {
                                            
                                                                    var role= member.guild.roles.cache.find(role => role.name === "Verifié");
                                                                    await member.roles.add(role);
                                                                }    
                                            
                                                                try {
                                                                    bot.channels.cache.get('963807815170924605').send({ embeds: [captcharf]  })
                                                                    var role= member.guild.roles.cache.find(role => role.name === "Verifié");
                                                                    await member.roles.add(role);
                                                                    await member.user.send({embeds: [captchar]})

                                                                    try {
                                                                        welcomechannel.send({embeds: [canvabienvenue], files: [attachment]})
                                                                        
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    }
                                                                    
                                            
                                                                    
                                            
                                            
                                                                } catch (err) {}
                                                                [...(await msg.channel.messages.fetch()).values()].filter(m => m.author.id === member.user.id || m.author.id === bot.user.id).forEach(async m => m.delete())
                                                                    
                                                                    db.query(`UPDATE user SET captcha = 'yes' WHERE userID = ${member.user.id}`)
                                                                    db.query(`UPDATE user SET date = '${date.format(now, pattern)}' WHERE userID = ${member.user.id}`)
                                            
                                                                    
                                            
                                                            } else {
                                                                const captcharv = new MessageEmbed()
                                                                    .setColor('#f00020')
                                                                    .setTitle('❌ __**Captcha Raté !**__ ❌')
                                                                    .setURL('https://discord.gg/u8gsYrsg')
                                                                    .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                    .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                    .setDescription('<@' + `${member.user.id}` + '>' + " à raté le captcha " + `**${date.format(now, pattern)}**`)
                                                                    .setTimestamp()
                                                                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                                                                valided = true;
                                                                await collectorb.stop()
                                                                await collectorm.stop()
                                                                try {
                                                                    
                                                                    await member.user.send({embeds: [captchaf]})
                                                                } catch (err) {}
                                                                [...(await msg.channel.messages.fetch()).values()].filter(m => m.author.id === member.user.id || m.author.id === bot.user.id).forEach(async m => m.delete())
                                                                await member.kick()
                                                                db.query(`UPDATE user SET captcha = 'raté' WHERE userID = ${member.user.id}`)
                                                                bot.channels.cache.get('963807815170924605').send({ embeds: [captcharv]  })
                                                            }
                                                        })
                                                    
                                                        collectorm.on("end", async () => {
                                            
                                                            if(valided === false) {
                                                                const captcharv = new MessageEmbed()
                                                                    .setColor('#90EE90')
                                                                    .setTitle('❌ __**Captcha Raté !**__ ❌')
                                                                    .setURL('https://discord.gg/u8gsYrsg')
                                                                    .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                                    .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                                    .setDescription('<@' + `${member.user.id}` + '>' + " à raté le captcha " + `**${date.format(now, pattern)}**`)
                                                                    .setTimestamp()
                                                                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                                                                await collectorb.stop()
                                                                await collectorm.stop()
                                                                try {
                                                                    
                                                                    await member.user.send({embeds: [captchaf]})
                                                                } catch (err) {}
                                                                [...(await msg.channel.messages.fetch()).values()].filter(m => m.author.id === member.user.id || m.author.id === bot.user.id).forEach(async m => m.delete())
                                                                await member.kick()
                                                                db.query(`UPDATE user SET captcha = 'raté' WHERE userID = ${member.user.id}`)
                                                                bot.channels.cache.get('963807815170924605').send({ embeds: [captcharv]  })
                                                                
                                                            }
                                                        })
                                                    })    
                                                    } else if(req[0].captcha === "yes") {
                                                        var role= member.guild.roles.cache.find(role => role.name === "Verifié");
                                                        await member.roles.add(role);
                                                        member.user.send({embeds: [ captchaall ]}); 
                                                        const captcharvc = new MessageEmbed()
                                                        .setColor('#ffff00')
                                                        .setTitle('➡ __**Captcha Passé !**__ ➡')
                                                        .setURL('https://discord.gg/u8gsYrsg')
                                                        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
                                                        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                                                        .setDescription('<@' + `${member.user.id}` + '>' + " à passé le captcha " + `**${req[0].date}**` + " donc il n'as pas eu à le refaire !")
                                                        .setTimestamp()
                                                        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                                                        bot.channels.cache.get('963807815170924605').send({ embeds: [captcharvc]  })
                                                    }    
                                                })   
                                                
                                                
                                            } else {
                                                var role= member.guild.roles.cache.find(role => role.name === "Verifié");
                                                await member.roles.add(role);
                                                


                                            }
                                            

                                            db.query(`SELECT * FROM user WHERE userID = '${member.user.id}'`, async (err, req) => {
                                                
                                                if(req.length < 1) return;

                                                if(req[0].rule === 'yes') {
                                                    let channel = bot.channels.cache.get("906191168285597771")
                                                    let acceptrole = channel.guild.roles.cache.get("906194727337066577")
                                                    member.roles.add(acceptrole.id)
                                                } else {
                                                    return
                                                }
                                        
                                        
                                            })
                                        })   
                                    }
    })


})
