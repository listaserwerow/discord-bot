const Discord = require('discord.js');
const {
    token,
    prefix
} = require('./config.json');
const bot = new Discord.Client();
const commands = require("./commands");

bot.on('ready', () => {
    console.log('\nBot zostal wlaczony');

	bot.user.setPresence({
		status: "online",
		game: {
			name: "lsmc.pl",
		}
	});
});
bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "random").send(member.toString() + " dołączył na nasz serwer!")
});
bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "random").send((member.nickname + "#" + member.user.discriminator) + " wyszedł z naszego serwera!")
});
bot.on('message', message => {
    var cmdchannels = ["apokryf", "testowy"];
    if (!cmdchannels.includes(message.channel.name)) {
        return;
    }
    if (message.content.indexOf(prefix) !== 0) {
        return;
    }
    const args = message.content.slice(prefix.length).trim().split(/\s+/g);
    if (commands.callCommand(args, message)) {
        return;
    }
});
bot.login(token);
