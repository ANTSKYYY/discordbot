const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder} = require("@discordjs/builders");
const { token } = require('../config');
const { Options } = require('discord.js');
const Builders = require("@discordjs/builders")

module.exports =  async(bot, options) => {
  
  const commands = [
 	new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Permet de changer le prefix du bot ")
    .addStringOption(option => option.setName("prefix").setDescription("Le préfix que le bot doit avoir").setRequired(true)),

    new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Permet de supprimer un nombre de messages")
    .addStringOption(option => option.setName("nombre").setDescription("Le nombre de message à effacer").setRequired(true)),

    
    new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Permet de connaître les utilisateurs avec le plus d'XP !"),

    new SlashCommandBuilder()
    .setName("moneyboard")
    .setDescription("Permet de connaître les utilisateurs avec le plus d'argent !"),

    new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Permet de redemarrer le bot"),

    new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Permet de connaitre ton niveau sur le serveur ")
    .addUserOption(option => option.setName("mention").setDescription("Voir Xp d'un joueur en particulier").setRequired(false)),

    new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Permet de bannir définitivement un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à bannir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(false)),

    new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Permet de débannir un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à débannir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du débannissement").setRequired(false)),
     
    new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Permet d'expulser un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à expulser").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison de l'expulsion").setRequired(false)),

    new SlashCommandBuilder()
    .setName("captcha")
    .setDescription("Permet d'activer ou de désactiver le captcha")
    .addStringOption(option => option.setName("état").setDescription("L'état de le captcha.").setRequired(true).addChoice("activer", "on").addChoice("désactiver", "off"))
    .addChannelOption(option => option.setName("channel").setDescription("Le channel ou le captcha sera actif").setRequired(true)),    

    new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Permet d'avertir un utilisateur de son comportement")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à avertir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison de l'avertissement").setRequired(true)),

    new SlashCommandBuilder()
    .setName("infractions")
    .setDescription("Permet de consulter le nombre d'infractions d'un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("L'utilisateur à consulter").setRequired(true)),

    new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Permet d'avoir les informations d'un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Trouver les informations d'un joueur particulier").setRequired(false)),

    new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Permet d'avoir les informations du serveur"),

    new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Permet de rendre muet un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à rendre muet").setRequired(true))
    .addStringOption(option => option.setName("temps").setDescription("Le temps du muet").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du muet").setRequired(true)),

    new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Permet de rendre la parole d'un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui rendre la parole").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du rendu de parole").setRequired(false)),


    new SlashCommandBuilder()
    .setName("chicken")
    .setDescription("Permet de jouer au jeu du poulet")
    .addStringOption(option => option.setName("mise").setDescription("Le montant de ta mise d'argent").setRequired(true))
    .addStringOption(option => option.setName("os").setDescription("Le nombre d'os dans le jeu").setRequired(true)),

    new SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet de connaître toutes les commandes du bot"),
    

    new SlashCommandBuilder()
    .setName("antiraid")
    .setDescription("Permet d'activer ou de désactiver l'anti-raid")
    .addStringOption(option => option.setName("état").setDescription("L'état de l'antiraid").setRequired(true).addChoice("✅ activer", "on").addChoice("❌ désactiver", "off")),

    new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Permet de voir la photo de profil d'un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui voir la photo").setRequired(false)),

    new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Permet d'obtenir la réponse à des questions...")
    .addStringOption(option => option.setName("question").setDescription("La question à poser").setRequired(true)),

    new SlashCommandBuilder()
    .setName("rouletterusse")
    .setDescription("Permet de jouer avec le feu... Et poutine"),

    new SlashCommandBuilder()
    .setName("machineasous")
    .setDescription("Permet de jouer à la machine à sous")
    .addStringOption(option => option.setName("mise").setDescription("Le montant de ta mise d'argent").setRequired(true)),

    new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Permet de jouer a la fameuse roulette de casino !")
    .addStringOption(option => option.setName("mise").setDescription("Le montant de ta mise d'argent").setRequired(true)),

    new SlashCommandBuilder()
    .setName("argent")
    .setDescription("Permet de voir combien d'argent on possède")
    .addUserOption(option => option.setName("mention").setDescription("Voir Xp d'un joueur en particulier").setRequired(false)),

    new SlashCommandBuilder()
    .setName("calin")
    .setDescription("Permet de diffuser de l'amour autour de soi")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui envoyer de l'amour propre").setRequired(true)),

    new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Permet d'ajouter ou de retirer des mots blacklist sur le serveur")
    .addStringOption(option => option.setName("état").setDescription("Ajouter ou retirer un mot").setRequired(true).addChoice("✅ Ajouter", "add").addChoice("❌ Retirer", "remove"))
    .addStringOption(option => option.setName("mot").setDescription("Le mot à blacklist").setRequired(true)),

    new SlashCommandBuilder()
    .setName("blacklistliste")
    .setDescription("Permet de voir les mots interdits sur le serveur "),

    new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Permet de connaitre la latence du bot"),
  
    new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Permet d'envoyer l'embed du shop"),

    new SlashCommandBuilder()
    .setName("jojo")
    .setDescription("Cette commande est une jojo ref ?"),
      
      new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Permet d'envoyer l'embed des tickets"),

    new SlashCommandBuilder()
    .setName("rule")
    .setDescription("Permet d'envoyer l'embed des regles"),

    new SlashCommandBuilder()
    .setName("reseaux")
    .setDescription("Permet d'envoyer l'embed des reseaux"),

    new SlashCommandBuilder()
    .setName("role")
    .setDescription("Permet d'envoyer l'embed des roles"),

    new SlashCommandBuilder()
    .setName("give")
    .setDescription("Permet de donner de ton argent à un autre joueur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui donner l'argent").setRequired(true))
    .addStringOption(option => option.setName("montant").setDescription("Le montant à donner").setRequired(true)),

    new SlashCommandBuilder()
    .setName("giveadmin")
    .setDescription("Permet de donner de l'argent")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui donner l'argent").setRequired(true))
    .addStringOption(option => option.setName("montant").setDescription("Le montant à donner").setRequired(true)),

    new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Permet de promouvoir administrateur un membre du serveur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à promouvoir").setRequired(true)),
    

    new SlashCommandBuilder()
    .setName("moderateur")
    .setDescription("Permet de promouvoir modérateur un membre du serveur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à promouvoir").setRequired(true)),

    new SlashCommandBuilder()
    .setName("membre")
    .setDescription("Permet de rétrograder un membre du serveur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à rétrograder").setRequired(true)),

    new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Permet de retirer de l'argent")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui retirer l'argent").setRequired(true))
    .addStringOption(option => option.setName("montant").setDescription("Le montant à retirer").setRequired(true)),

   new SlashCommandBuilder()
    .setName("jour")
    .setDescription("Permet d'envoyer l'embed des recompenses quotidiennes"),

    new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Permet de voir les informations techniques du bot"),

    
  ]

  const rest = new REST({ version: "9" }).setToken(token)

  bot.guilds.cache.forEach(async guild => {
        
    await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });

  })
  
  console.log("🤖 Les slash commands ont bien été chargé ! ✅")
}