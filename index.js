const { token } = require("./config");
const Client = require("./Structure/Client")
const bot = new Client();
const { Discord, Collection } = require('discord.js');



bot.start(token);
  
