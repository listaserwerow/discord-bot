var commands = {};

console.log("xxxxtest");

require("fs").readdirSync("./commands").forEach(function(file) {
  if (file === "index.js")
  {
    return;
  }
  var command = require("./" + file);
  for (var i = 0; i < command.command.length; i++)
  {
    commands[command.command[i]] = command;
  }
});

module.exports.callCommand = function(args, message) {
  if (args.length < 1)
  {
    return false;
  }
  var command = commands[args[0]];
  if (!command)
  {
    return false;
  }
  command.callback(args.slice(1), message);
  return true;
};
