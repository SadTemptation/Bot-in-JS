const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {
    Permissions
} = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const flags = [
    'MANAGE_CHANNELS',
    'MANAGE_ROLES',
    'ADMINISTRATOR',
    'KICK_MEMBERS',
    'BAN_MEMBERS'
];
const permissions = new Permissions(flags);
const mysql = require('mysql');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = config.prefix;
5

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.login(config.token)

client.on('ready', () => {
    console.log(`Logged in as '${client.user.tag}'!`);
});

//mysql create connection
const con = mysql.createConnection({
    host: "localhost",
    user: "DiscordBot",
    password: "#MarWil1312",
    port: 1414,
    database: "warnings",
    insecureAuth: true
})

con.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("connected to MySQL!");
})

//mysql print table
var globalResult;
con.query("SELECT * FROM warningsList", function (err, result, fields) {
    console.log(result);
    globalResult = result;
})


//commands
client.on('message', msg => {
    const sender = msg.member;

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log(args);
    console.log(commandName);



    const command = client.commands.get(commandName);

    switch (commandName) { //ping
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
    };

    if (command === `warn`) {
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