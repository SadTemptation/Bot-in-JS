"use strict";

module.exports = {
  name: "user-info",
  description: "returns the info of the sender",
  execute: function execute(msg, args) {
    msg.channel.send("Your username: ".concat(msg.author.username, "\nYour ID: ").concat(msg.author.id));
  }
};