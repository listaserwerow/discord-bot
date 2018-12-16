const Discord = require('discord.js');
const {token, prefix} = require('./config.json');
const request = require('request');
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
	var cmdchannels = ["apokryf"]
	const args = message.content.slice(prefix.length).trim().split(/\s+/g);
switch (args[0]) {
	case "premium":
		let nick = args[1];
		request(`https://lsmc.pl/api/minecraft/haspaid/${nick}`, {json:true}, (error, response, body) => {
			if (cmdchannels.includes(message.channel.name)) {
				if (args.length < 2) {
					message.channel.send("Musisz podać nazwę konta!")
				}
				else {
					message.channel.send(body === true ? 'To jest konto premium.' : 'To nie jest konto premium.')
				}}
			else {
				message.channel.send(`Komendy możesz używać tylko na kanale #${cmdchannels}`)
			}
		});
		break;
	case "serwer":
		let id = args[1];
		request(`https://lsmc.pl/api/server/${id}`, {json:true}, (error, response, body) => {
			if (cmdchannels.includes(message.channel.name)) {
				if (args.length < 2) {
					message.channel.send("Proszę podać nazwę serwera.")
				}
				else if (!body === true) {
					message.channel.send("Wystąpił błąd podczas pobierania informacji z serwera.")
				}
				else {
					message.channel.send(
						new Discord.RichEmbed()
							.addField("Informacje o serwerze", `${body.name}#${body.id}`)
							.addField("Miejsce w rankingu", body.rank.voteRank)
							.addField("Status", body.status.type === "ONLINE" ? `${body.status.onlinePlayers}/${body.status.maxPlayers}` : "Serwer jest offline")
							.addField("Ilość głosów", body.votes > 0 ? `${body.votes}` : "0")
							.setColor("BLUE")
				)}}
			else {
				message.channel.send(`Komendy możesz używać tylko na kanale #${cmdchannels}`)
			}
		});
		break;
}
bot.login(token);