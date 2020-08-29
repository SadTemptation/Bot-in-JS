"use strict";

module.exports = {
  name: "warn",
  description: "warns users, 3 warns = a kick",
  execute: function execute(msg, args) {
    var sender = msg.member;

    var mysql = require('mysql');

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

      console.log("connected to MySQL! from warn.js");
    });
    con.query("SELECT * FROM warningsList", function (err, result, fields) {
      console.log(result);
    });
    if (!sender.hasPermission("ADMINISTRATOR")) return msg.channel.send("Invalid Permissions");
    var subject = msg.guild.member(msg.mentions.users.first());
    if (!subject) return msg.channel.send("Invalid User");

    if (sender.hasPermission("ADMINISTRATOR") && (sender != subject || sender != client.user.tag)) {
      //update mysql database
      con.query("SELECT * FROM warningsList", function (err, result, fields) {
        console.log(result);
      });
      var sql = "SELECT ".concat(subject, " FROM warningslist");

      try {
        con.query(sql, function (err, result) {
          console.log("Found the subject in the sql table");
          var globalResult = [];
          globalResult = result;
        });
      } catch (err) {
        if (globalResult.includes('username: \'' + subject + '\'') && globalResult.includes('numOfWarnings: 2')) {
          sql = "UPDATE warningsList SET numOfWarnings = 3 WHERE username = '".concat(subject, "', numOfWarnings = 1");
          con.query(sql, function (err, result) {
            if (err) return;
            console.log(result.affectedRows + " record(s) updated");
          });
        } else if (!globalResult.includes('username: \'' + subject + '\'')) {
          sql = "INSERT INTO warningsList (username, numOfWarnings) VALUES ('".concat(subject, "', 1)");
          con.query(sql, function (err, result) {
            if (err) return err;
            console.log("1 record inserted");
          });
        } else if (globalResult.includes('numOfWarnings: \'3\'') && globalResult.includes('username: \'' + subject + '\'')) {
          subject.kick({
            reason: "You have been warned three times, that's a kick"
          });
          sql = "DELETE FROM warningsList WHERE username = '".concat(subject, "'");
        }
      }

      if (true) {
        sql = "UPDATE warningsList SET numOfWarnings = 2 WHERE username = '".concat(subject, "', numOfWarnings = 1");
        con.query(sql, function (err, result) {
          if (err) return err;
          console.log(result.affectedRows + " record(s) updated");
        });
      }
    }
  }
};