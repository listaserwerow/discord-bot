const Discord = require('discord.js');

module.exports.command = ["reputation", "rep"];

module.exports.callback = function(args, message) {
    if (args.length < 1) {
        message.channel.send("Poprawne użycie: !reputation <użytkownik>")
        return;
    }
    if (message.mentions.users.size > 1) {
        message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Błąd")
            .setDescription("W jednym momencie możesz sprawdzać reputację tylko jednej osoby")
            .setColor("RED")
        );
        return;
    }
    var user = message.mentions.users.first();
    var reputations = require("./../reputations.json");
    var reputation = reputations[user.id];
    if (!reputation) {
        reputation = {
            rep: 0
        };
    }
    message.channel.send(new Discord.RichEmbed()
        .addField("Informacje o użytkowniku", user)
        .addField("Reputacja", reputation.rep)
        .setColor("BLUE")
		.setThumbnail(user.avatarURL));
};
