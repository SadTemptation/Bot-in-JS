"use strict";
exports.__esModule = true;
var Discord = require('discord.js');
var client = new Discord.Client();
var Permissions = require('discord.js').Permissions;
var flags = [
    'MANAGE_CHANNELS',
    'MANAGE_ROLES',
    'ADMINISTRATOR',
    'KICK_MEMBERS',
    'BAN_MEMBERS'
];
var permissions = new Permissions(flags);
var mysql = require('mysql');
client.login('NzQ3NDAzNTUyMDE1Nzc3ODAz.X0OXzA.BWPHXZlriL9hGxs9LLJODONf5vw');
client.on('ready', function () {
    console.log("Logged in as '" + client.user.tag + "'!");
});
//mysql
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
});
con.query("SELECT * FROM warningsList", function (err, result, fields) {
    console.log(result);
});
//commands
client.on('message', function (msg) {
    var sender = msg.member;
    if (msg.content.includes('.') && (msg.author.tag != client.user.tag)) {
        if (msg.content.includes('ping')) {
            msg.reply('pong!');
        } //ping command
        //ban command
        else if (msg.content.includes('ban')) {
            if (!msg.member.hasPermission("BAN_MEMBERS"))
                return msg.channel.send("Invalid Permissions"); //checks if sender has perms
            var subject = msg.guild.member(msg.mentions.users.first()); //creates a variable with the details of the user being banned
            if (!subject)
                return msg.channel.send("Invalid User"); //checks if the user being banned exists
            if (msg.member.hasPermission("BAN_MEMBERS") && (sender != subject)) {
                subject.ban({ reason: sender + " said so" });
            } //bans the user if the msg.author has permissions
            if (sender === subject)
                msg.channel.send('You can\'t ban yourself you dumb twat');
        }
        //kick command 
        else if (msg.content.includes('kick')) {
            if (!sender.hasPermission("KICK_MEMBERS"))
                return msg.channel.send("Invalid Permissions"); //checks if sender has perms
            var subject = msg.guild.member(msg.mentions.users.first()); //creates a variable with the details of the user being kicked
            if (!subject)
                return msg.channel.send("Invalid User"); //checks if the user being kicked exists
            if (sender.hasPermission("KICK_MEMBERS") && (sender != subject || sender != client.user.tag)) {
                subject.kick({ reason: sender + " said so" });
            } //kicks the user if the msg.author has permissions
            if (sender === subject)
                msg.channel.send('You can\'t kick yourself dumbass');
        }
        //warn command  
        else if (msg.content.includes('warn')) {
            if (!sender.hasPermission("ADMINISTRATOR"))
                return msg.channel.send("Invalid Permissions");
            var subject = msg.guild.member(msg.mentions.users.first());
            if (!subject)
                return msg.channel.send("Invalid User");
            if (sender.hasPermission("ADMINISTRATOR") && (sender != subject || sender != client.user.tag)) {
                //update mysql database
                con.query("SELECT username, numOfWarnings FROM warningsList", function (err, result, fields) {
                    console.log(result);
                    var globalResult = result;
                });
                if (global.globalResult.includes('username: \'' + subject.user + '\'') && (globalResult.includes('numOfWarnings: \'1\''))) {
                    var sql = "UPDATE warningsList SET numOfWarnings = '2' WHERE username = '" + subject.user + "', numOfWarnings = '1'";
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.error('error : ' + err.stack);
                            return;
                        }
                        ;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                }
                else if (globalResult.includes('username: \'' + subject.user + '\'') && (globalResult.includes('numOfWarnings: \'2\''))) {
                    var sql = "UPDATE warningsList SET numOfWarnings = '3' WHERE username = '" + subject.user + "', numOfWarnings = '2'";
                    con.query(sql, function (err, result) {
                        if (err)
                            throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                }
                else if (!globalResult.includes('username: \'' + subject.user + '\'')) {
                    var sql = "INSERT INTO warningsList (username, numOfWarnings) VALUES ('" + subject.user + "', '1')";
                    con.query(sql, function (err, result) {
                        if (err)
                            throw err;
                        console.log("1 record inserted");
                    });
                }
                else if (globalResult.includes('numOfWarnings: \'3\'') && globalResult.includes('username: \'' + subject.user + '\'')) {
                    subject.kick({ reason: "You have been warned three times, that's a kick" });
                    var sql = "DELETE FROM warningsList WHERE username = '" + subject.user + "'";
                }
            }
        }
    }
});
