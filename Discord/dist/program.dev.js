"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();
client.commands = new Discord.Collection();

var _require = require('discord.js'),
    Permissions = _require.Permissions;

var fs = require('fs');

var config = require('./config.json');

var flags = ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS'];
var permissions = new Permissions(flags);

var mysql = require('mysql');

var commandFiles = fs.readdirSync('./commands').filter(function (file) {
  return file.endsWith('.js');
});
var prefix = config.prefix;
5;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = commandFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;

    var command = require("./commands/".concat(file));

    client.commands.set(command.name, command);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

client.login(config.token);
client.on('ready', function () {
  console.log("Logged in as '".concat(client.user.tag, "'!"));
}); //mysql create connection

var con = mysql.createConnection({
  host: "localhost",
  user: "DiscordBot",
  password: "#MarWil1312",
  port: 1414,
  database: "warnings",
  insecureAuth: true
});
con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log("connected to MySQL!");
}); //mysql print table

var globalResult;
con.query("SELECT * FROM warningsList", function (err, result, fields) {
  console.log(result);
  globalResult = result;
}); //commands

client.on('message', function (msg) {
  var sender = msg.member;
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  var args = msg.content.slice(prefix.length).trim().split(/ +/);
  var commandName = args.shift().toLowerCase();
  console.log(args);
  console.log(commandName);
  var command = client.commands.get(commandName);

  switch (commandName) {
    //ping
    case "ping":
      command.execute(msg);
      break;

    case "beep":
      command.execute(msg, args);
      break;

    case "server":
      command.execute(msg, args);
      break;

    case "user-info":
      command.execute(msg, args);
      break;

    case "avatar":
      command.execute(msg, args);
      break;

    case "prune":
      command.execute(msg, args);
      break;

    case "ban":
      command.execute(msg, args);
      break;

    case "kick":
      command.execute(msg, args);
      break;

    case "warn":
      command.execute(msg, args);
      break;

    default:
      msg.channel.send("nani the fuck");
  }

  ;

  if (command === "warn") {
    /* if (!sender.hasPermission("ADMINISTRATOR")) return msg.channel.send("Invalid Permissions")
         let subject = msg.guild.member(msg.mentions.users.first())
     if (!subject) return msg.channel.send("Invalid User")
     if (sender.hasPermission("ADMINISTRATOR") && (sender != subject || sender != client.user.tag)) {
         //update mysql database
         con.query("SELECT * FROM warningsList", function (err, result, fields) {
             console.log(result);
         })
         if (globalResult.includes('username: \''+ subject + '\'' && globalResult.includes('numOfWarnings: 1'))) {
             var sql = `UPDATE warningsList SET numOfWarnings = 2 WHERE username = '${subject}', numOfWarnings = 1`
             con.query(sql, function (err, result) {
                 if (err) throw err;
                 console.log(result.affectedRows + " record(s) updated");
             });
           } else if (globalResult.includes('username: \''+ subject + '\'') && (globalResult.includes('numOfWarnings: 2'))) {                   
             var sql = `UPDATE warningsList SET numOfWarnings = 3 WHERE username = '${subject}', numOfWarnings = 1`
             con.query(sql, function (err, result) {
                 if (err) throw err;
                 console.log(result.affectedRows + " record(s) updated");
                 });
           } else if (!(globalResult.includes('username: \''+ subject + '\''))) {                    
             var sql = `INSERT INTO warningsList (username, numOfWarnings) VALUES ('${subject}', 1)`;
             con.query(sql, function (err, result) {
                 if (err) throw err;
                 console.log("1 record inserted");
             });
         } else if (globalResult.includes('numOfWarnings: \'3\'') && globalResult.includes('username: \''+ subject + '\'')) {
             subject.kick({reason: `You have been warned three times, that's a kick`})
             var sql = `DELETE FROM warningsList WHERE username = '${subject}'`;      
         }
     }*/
    msg.channel.send('this command is currently being worked on');
  }
});