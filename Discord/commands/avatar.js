module.exports = {
    name: `avatar`,
    aliases: ['icon', 'pfp'],
    description: `returns the mentioned users profile pic`,
    execute(msg, args) {
        if (!msg.mentions.users.size) {
            return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = msg.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        msg.channel.send(avatarList);
    }
}