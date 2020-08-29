const { execute } = require("./ping");

module.exports = {
    name: `server`,
    description: `returns the server name and amount of users on the server`,
    execute(msg, args) {
        msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
    }
}