const Discord = require('discord.js');
const request = require('request');

module.exports.command = ["server", "serverinfo", "serwer"];

module.exports.callback = function(args, message) {
    if (args.length < 1) {
        message.channel.send("Poprawne użycie: !serwer <id>")
        return;
    }
    let id = args[0];
    request(`https://lsmc.pl/api/server/${id}`, {
        json: true
    }, (error, response, body) => {
        if (response.statusCode === 404) {
            message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription("Nie znaleziono serwera o takim id")
                .setColor("RED")
            );
            return;
        }
        if ((response.statusCode / 100) !== 2) {
            message.channel.send(
                new Discord.RichEmbed()
				.setTitle("Błąd")
                .setDescription("Wystąpił błąd podczas pobierania informacji o serwerze")
                .setColor("RED")
            );
            return;
        }
        message.channel.send(
            new Discord.RichEmbed()
            .addField("Informacje o serwerze", `${body.name}#${body.id}`)
            .addField("Miejsce w rankingu", body.rank.voteRank)
            .addField("Status", body.status.type === "ONLINE" ? `${body.status.onlinePlayers}/${body.status.maxPlayers}` : "Serwer jest offline")
            .addField("Ilość głosów", body.votes > 0 ? `${body.votes}` : "0")
            .setColor("BLUE")
            .setImage("https://lsmc.pl/banner/" + body.bannerName));
    });
};
