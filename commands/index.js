const config = require("./../config.json");

var channels = [];
var commands = {};

require("fs").readdirSync("./commands").forEach(function(file) {
    if (file === "index.js") {
        return;
    }
    var command = require("./" + file);
    var channelList = command.channel || config.channels;
    if (!(channelList instanceof Array)) {
        channelList = [channelList];
    }
    command.channel = channelList;
    for (var i = 0; i < channelList.length; i++) {
        channels.indexOf(channelList[i]) == -1 && channels.push(channelList[i]);
    }
    var prefixList = command.prefix || config.prefix;
    if (!(prefixList instanceof Array)) {
        prefixList = [prefixList];
    }
    command.prefix = prefixList;
    var commandList = command.command;
    if (!(commandList instanceof Array)) {
        commandList = [commandList];
    }
    command.command = commandList;
    for (var x = 0; x < prefixList.length; x++) {
        for (var i = 0; i < commandList.length; i++) {
            var prefix = prefixList[x];
            var commandPrefix = commands[prefix];
            if (!commandPrefix) {
                commandPrefix = [];
                commands[prefix] = commandPrefix;
            }
            commandPrefix[commandList[i]] = command;
        }
    }
});

module.exports.callCommand = function(args, message) {
    var channelName = message.channel.name;
    if (args.length < 2) {
        return false;
    }
    var prefixList = commands[args[0]];
    if (!prefixList) {
        return false;
    }
    var command = prefixList[args[1]];
    if (!command) {
        return false;
    }
    if (command.channel.indexOf("*") == -1 && command.channel.indexOf(channelName) == -1) {
        return false;
    }
    command.callback(args.slice(2), message);
    return true;
};
