module.exports.command = [ "server", "serverinfo", "serwer" ];

module.exports.callback = function(args, message) {
  if (args.length < 1) {
    message.channel.send("Poprawne użycie: !serwer <id>")
  }

  let id = args[0];
		request(`https://lsmc.pl/api/server/${id}`, {json:true}, (error, response, body) => {
			if (!body === true) {
				message.channel.send("Wystąpił błąd podczas pobierania informacji z serwera.")
			        return;
                        }
				message.channel.send(
					new Discord.RichEmbed()
						.addField("Informacje o serwerze", `${body.name}#${body.id}`)
						.addField("Miejsce w rankingu", body.rank.voteRank)
						.addField("Status", body.status.type === "ONLINE" ? `${body.status.onlinePlayers}/${body.status.maxPlayers}` : "Serwer jest offline")
						.addField("Ilość głosów", body.votes > 0 ? `${body.votes}` : "0")
						.setColor("BLUE"));
		});
};
