"use strict";

var _require = require('../config.json'),
    prefix = _require.prefix;

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  execute: function execute(msg, args) {
    var data = [];
    var commands = msg.client.commands;

    if (!args.length) {
      data.push("Here's a list of all my commands:");
      data.push(commands.map(function (command) {
        return command.name;
      }).join(', '));
      data.push("\nYou can send `".concat(prefix, "help [command name]` to get info on a specific command!"));
      return msg.author.send(data, {
        split: true
      }).then(function () {
        if (message.channel.type === 'dm') return;
        message.reply("I've sent you a DM with all my commands!");
      })["catch"](function (error) {
        console.error("Could not send help DM to ".concat(message.author.tag, ".\n"), error);
        message.reply("it seems like I can't DM you! Do you have DMs disabled?");
      });
    }

    var name = args[0].toLowerCase();
    var command = commands.get(name) || commands.find(function (c) {
      return c.aliases && c.aliases.includes(name);
    });

    if (!command) {
      return message.reply('that\'s not a valid command!');
    }

    data.push("**Name:** ".concat(command.name));
    if (command.aliases) data.push("**Aliases:** ".concat(command.aliases.join(', ')));
    if (command.description) data.push("**Description:** ".concat(command.description));
    if (command.usage) data.push("**Usage:** ".concat(prefix).concat(command.name, " ").concat(command.usage));
    message.channel.send(data, {
      split: true
    });
  }
};