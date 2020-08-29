module.exports = {
    name: `user-info`,
    description: `returns the info of the sender`,
    execute(msg, args) {
        msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
    }
}