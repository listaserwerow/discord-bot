const Discord = require('discord.js');
var fs = require('fs');
const reputations = require("./../reputations.json");

module.exports.command = ["1"];
module.exports.prefix = "+";
module.exports.channel = "*";

module.exports.callback = function(args, message) {
    if (args.length < 1) {
        message.channel.send("Poprawne użycie: +1 <użytkownik>")
        return;
    }
	message.mentions.users.forEach(user => {
		if (user === message.author)
		{
			message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription(message.author + " nie możesz dać plusa samemu sobie")
                .setColor("RED")
            );
			return;
		}
		let reputation = reputations[user.id];
		if (!reputation)
		{
			reputation = {
				rep: 0,
				awarded: {
					"+": [],
					"-": []
				}
			};
			reputations[user.id] = reputation;
		}
		const authorId = message.author.id;
		if (reputation.awarded["+"].indexOf(authorId) >= 0)
		{
			message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription(message.author + " dałeś już plusa użytkownikowi " + user)
                .setColor("RED")
            );
			return;
		}
		reputation.rep++;
		reputation.awarded["+"].push(authorId);
		fs.writeFile("./reputations.json", JSON.stringify(reputations), 'utf8', function() {});
		message.channel.send(
			new Discord.RichEmbed()
			.setTitle("+1")
			.setDescription(user + " dostał plusa od " + message.author + " i ma już " + reputation.rep + " punktów reputacji")
			.setColor("RED")
		);
	});
};
