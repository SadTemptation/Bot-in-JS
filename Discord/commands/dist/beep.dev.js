"use strict";

module.exports = {
  name: 'beep',
  description: 'Beep!',
  execute: function execute(msg, args) {
    msg.channel.send('Boop.');
  }
};