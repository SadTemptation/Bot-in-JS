"use strict";

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute: function execute(msg) {
    msg.channel.send('Pong.');
  }
};