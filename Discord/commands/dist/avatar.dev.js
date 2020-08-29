"use strict";

module.exports = {
  name: "avatar",
  aliases: ['icon', 'pfp'],
  description: "returns the mentioned users profile pic",
  execute: function execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send("Your avatar: <".concat(msg.author.displayAvatarURL({
        format: "png",
        dynamic: true
      }), ">"));
    }

    var avatarList = msg.mentions.users.map(function (user) {
      return "".concat(user.username, "'s avatar: <").concat(user.displayAvatarURL({
        format: "png",
        dynamic: true
      }), ">");
    }); // send the entire array of strings as a message

    msg.channel.send(avatarList);
  }
};