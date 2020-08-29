"use strict";

module.exports = {
  name: "prune",
  description: "deletes a certain amount of messages between 2 and 100",
  execute: function execute(msg, args) {
    var amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return msg.reply('that is not a fucking number, baka');
    } else if (amount < 2 || amount > 100) {
      return msg.reply('p.s. you need to input a number between 2 and 100.');
    } else {
      msg.channel.bulkDelete(amount, true)["catch"](function (err) {
        console.error(err);
        msg.channel.send('there was an error trying to prune messages in this channel!');
      });
    }
  }
};