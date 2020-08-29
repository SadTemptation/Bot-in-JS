"use strict";

var _require = require("./ping"),
    execute = _require.execute;

module.exports = {
  name: "server",
  description: "returns the server name and amount of users on the server",
  execute: function execute(msg, args) {
    msg.channel.send("Server name: ".concat(msg.guild.name, "\nTotal members: ").concat(msg.guild.memberCount));
  }
};