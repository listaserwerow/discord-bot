const Discord = require('discord.js');
const request = require('request');

module.exports.command = ["premium"];

module.exports.callback = function(args, message) {
    if (args.length < 1) {
        message.channel.send("Poprawne użycie: !premium <nick>")
        return;
    }

    let nick = args[0];
    request(`https://lsmc.pl/api/minecraft/name/${nick}`, {
        json: true
    }, (error, response, body) => {
        if (response.statusCode === 404) {
            message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription("Gracz o takiej nazwie nie ma premium")
                .setColor("RED")
            );
            return;
        }
		if ((response.statusCode / 100) !== 2) {
            message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription("Wystąpił błąd podczas pobierania informacji o użytkowniku")
                .setColor("RED")
            );
            return;
        }
        message.channel.send(
            new Discord.RichEmbed()
            .addField("Nick", body.name)
            .addField("UUID", body.id)
            .setColor("BLUE")
        );
    });

};
