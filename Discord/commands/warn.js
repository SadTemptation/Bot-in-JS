module.exports = {
    name: `warn`,
    description: `warns users, 3 warns = a kick`,
    execute(msg, args) {
        const sender = msg.member;
        const mysql = require('mysql');
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
            console.log("connected to MySQL! from warn.js");
        })


        con.query("SELECT * FROM warningsList", function (err, result, fields) {
            console.log(result);
        });

        if (!sender.hasPermission("ADMINISTRATOR")) return msg.channel.send("Invalid Permissions")
        let subject = msg.guild.member(msg.mentions.users.first())
        if (!subject) return msg.channel.send("Invalid User")
        if (sender.hasPermission("ADMINISTRATOR") && (sender != subject || sender != client.user.tag)) {

            //update mysql database
            con.query("SELECT * FROM warningsList", function (err, result, fields) {
                console.log(result);
            })
            let sql = `SELECT ${subject} FROM warningslist`
            try {
                con.query(sql, function (err, result) {
                    console.log("Found the subject in the sql table");
                    var globalResult = [];
                    globalResult = result;
                })
            } catch (err) {
                if (globalResult.includes('username: \'' + subject + '\'') && ((globalResult).includes('numOfWarnings: 2'))) {
                    sql = `UPDATE warningsList SET numOfWarnings = 3 WHERE username = '${subject}', numOfWarnings = 1`
                    con.query(sql, function (err, result) {
                        if (err) return;
                        console.log(result.affectedRows + " record(s) updated");
                    });

                } else if (!(globalResult.includes('username: \'' + subject + '\''))) {
                    sql = `INSERT INTO warningsList (username, numOfWarnings) VALUES ('${subject}', 1)`;
                    con.query(sql, function (err, result) {
                        if (err) return err;
                        console.log("1 record inserted");
                    });
                } else if ((globalResult.includes('numOfWarnings: \'3\'')) && ((globalResult).includes('username: \'' + subject + '\''))) {
                    subject.kick({
                        reason: `You have been warned three times, that's a kick`
                    })
                    sql = `DELETE FROM warningsList WHERE username = '${subject}'`;
                }
            }
            if (true) {
                sql = `UPDATE warningsList SET numOfWarnings = 2 WHERE username = '${subject}', numOfWarnings = 1`
                con.query(sql, function (err, result) {
                    if (err) return err;
                    console.log(result.affectedRows + " record(s) updated");
                });
            }

        }

    }
}