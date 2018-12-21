const Discord = require('discord.js');
const config = require('./config.json');
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
	if (message.author == bot.user)
	{
		return;
	}
    var content = message.content;
    if (content.length > 0) {
        var prefix = content.slice(0, 1);
        const args = content.slice(prefix.length).trim().split(/\s+/g);
        if (commands.callCommand([prefix].concat(args), message)) {
            return;
        }
    }
});
bot.login(config.token);
