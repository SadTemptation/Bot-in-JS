"use strict";

module.exports = {
  name: "kick",
  description: "kicks the mentioned user",
  execute: function execute(msg, args) {
    var sender = msg.member;
    if (!sender.hasPermission("KICK_MEMBERS")) return msg.channel.send("Invalid Permissions"); //checks if sender has perms

    var subject = msg.guild.member(msg.mentions.users.first()); //creates a variable with the details of the user being kicked

    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    } //invalid user


    if (!subject) return msg.channel.send("Invalid User Retard"); //checks if the user being kicked exists

    if ((sender.hasPermission("KICK_MEMBERS") || sender.hasPermission("ADMINISTRATOR")) && (sender != subject || sender != client.user.tag)) {
      msg.channel.send("@".concat(subject.user.tag, " has been kicked"));
      subject.kick({
        reason: "".concat(sender.user.tag, " said so")
      });
    } //kicks the user if the msg.author has permissions


    if (sender === subject) msg.channel.send('You can\'t kick yourself dumbass');
  }
};