const Discord = require('discord.js');
const {token} = require('./config.json');
const bot = new Discord.Client();
bot.on('ready', () => {
	console.log('\nBot zostal wlaczony');
	bot.user.setActivity("lsmc.pl", {type: "WATCHING"});
});
bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "random").send(member.toString() + " dołączył na nasz serwer!")
});
bot.on("guildMemberRemove", function(member) {
	member.guild.channels.find("name", "random").send(member.toString() + " wyszedł z naszego serwera!")
});
bot.login(token);