const Discord = require('discord.js')
const Event = require("../../Structure/Event")
const SlashCommand = require('../../Structure/SlashCommand')
const { MessageEmbed } = require('discord.js');
const Client = require('../../Structure/Client');
const messageCreate = require('./messageCreate');
const date = require('date-and-time');
const fs = require('fs');
const rss = require('rss-converter');
const config = require('../../config.json');
const { joinVoiceChannel } = require('@discordjs/voice');
 

module.exports = new Event("ready", async (bot, member, interaction) => {
  await SlashCommand(bot)
  console.log(`💙 Inviter le bot : 👉 https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands 👈\n✅🤖 Le bot est prêt sous : ${bot.user.tag}`)
  
      
      
    bot.user.setPresence({
    status: "online",  // You can show online, idle... Do not disturb is dnd
    activities : [{
      type: "STREAMING",
      url:"https://www.youtube.com/watch?v=qUzzHk6L488",
      name: "Ma dernière vidéo 👇"}]
          
      })

  const db = bot.db;
        

  
    const guild = bot.guilds.cache.get(`906191168285597766`);

    // Get our stats channels
    const totalUsers = bot.channels.cache.get('965684282444091472');
    
    // Check every 30 seconds for changes
    setInterval(function() {
    
        //Get actual counts
        var userCount = guild.members.cache.size;
        
    
        // Set channel names
        totalUsers.setName("📊 | Membres : " + userCount)
        .catch(console.error);        
        
    }, 30000)
  
                           
    
    
    setInterval(function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        today = dd


        var today2 = new Date();
        var dd2 = String(today2.getDate()).padStart(2, '0');
        today2 = dd2

        if(today != today2){
            bot.channels.cache.get('970646589913853952').send({content: "yo"})

        }
    }, 1000)    

    

    

    
   
      

    setInterval(async () => {

        db.query(`SELECT * FROM giveaways`, async (err, req) => {

            if(req.length < 1) return;

            for(let i = 0; i < req.length; i++) {

                if(Date.now() >= parseInt(req[i].date) && req[i].finish === "non") {

                    let channel = bot.guilds.cache.get(req[i].guildID).channels.cache.get(req[i].channelID);
                    if(!channel) return db.query(`DELETE FROM giveaways WHERE giveawayID = '${req[i].giveawayID}'`);

                    db.query(`SELECT * FROM participants WHERE giveawayID = '${req[i].giveawayID}'`, async (err, part) => {

                        if(parseInt(req[i].winners) > parseInt(part.length)) return channel.send(`Il n'y a pas assez de participants dans le concours \`${req[i].giveawayID}\` !`) && db.query(`DELETE FROM giveaways WHERE giveawayID = '${req[i].giveawayID}'`);
                        
                        
                        let number = Math.floor(Math.random() * parseInt(req[i].winners))
                        let winner = bot.users.cache.get(part[number].userID)
                        
                        if(req[0].finish === "non"){
                            const Embedwin = new Discord.MessageEmbed()
                            .setColor('#7f00ff')
                            .setTitle("<:7913xmasgift:963540123260166217> Concours Terminé ! <:7913xmasgift:963540123260166217>")
                            .setDescription(`**Gagnant(s)** : ${winner}\n\nBien joué à tous ! Vous gagnerez surement **une prochaine fois** !`)
                            .setTimestamp()
                            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
                            .setImage('https://i.imgur.com/DIapvsK.jpg')

                            
                            channel.send({ embeds: [Embedwin]})
                        }
                        db.query(`UPDATE giveaways SET finish = 'oui' WHERE giveawayID = '${req[i].giveawayID}'`)
                        db.query(`UPDATE giveaways SET winner = '${winner}' WHERE giveawayID = '${req[i].giveawayID}'`)

                        
                    })
                }
            }
        })
    }, 1 * 100)




    // Youtube 

    setInterval(async () => {
        let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt);
        let jsonOpen = fs.readFileSync('links.json');
        let json = JSON.parse(jsonOpen);
        if (jsonOpen.includes(feed.items[0].yt_videoId)) return;
        json.push(feed.items[0].yt_videoId);
        let jsonLink = JSON.stringify(json);
        fs.writeFileSync('links.json', jsonLink);
        
          bot.channels.cache.get(config.channel_id).send({content: "<:SOCIAL_youtube:964225939301101568>  __**Nouvelle vidéo !**__ <:SOCIAL_youtube:964225939301101568>\n**Une nouvelle vidéo de __Antskyyy__ vient de sortir ! Va voir ça ! <:8909yes:963540124090662952>\n**" + `https://www.youtube.com/watch?v=${feed.items[0].yt_videoId}\n\n<@&962730639851925564>`})
        }, 60000);
    
})        



    


        