"use strict";

module.exports = {
  name: "ban",
  description: "Bans mentioned user if sender is an admin or has perms",
  execute: function execute(msg, args) {
    var sender = msg.member;
    if (!sender.hasPermission("BAN_MEMBERS")) return msg.channel.send("Invalid Permissions"); //checks if sender has perms

    var subject = msg.guild.member(msg.mentions.users.first()); //creates a variable with the details of the user being banned

    if (!subject) return msg.channel.send("Invalid User"); //checks if the user being banned exists

    if ((sender.hasPermission("BAN_MEMBERS") || sender.hasPermission("ADMINISTRATOR")) && sender != subject) {
      msg.channel.send("@".concat(subject.user.tag, " has been banned"));
      subject.ban({
        reason: "@".concat(sender.user.tag, " said so")
      });
    } //bans the user if the msg.author has permissions


    if (sender === subject) msg.channel.send('You can\'t ban yourself you dumb twat');
  }
};