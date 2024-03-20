require("colors");
const { Events, Client } = require("discord.js");
const timestamp = require("../utils/timestamp");

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log(
      `${timestamp()} `.gray +
        "[INFO]".blue +
        ` ${client.user.username} is online!`
    );
  },
};
setInterval(() => client.user.setActivity({ 
  name: `Your Server 🧐 `, 
  type: ActivityType.Watching }), 4000);
