const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Bot is ready!');
    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'roleadd',
            description: 'Add a role to a user',
            options: [
                {
                    name: 'user',
                    description: 'The user you want to add the role to',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'role',
                    description: 'The role you want to add',
                    type: 'ROLE',
                    required: true,
                },
            ],
        },
    });
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const { name, options } = interaction.data;
    if (name === 'roleadd') {
        const userId = options[0].value;
        const roleId = options[1].value;

        try {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const user = await guild.members.fetch(userId);
            const role = guild.roles.cache.get(roleId);
            
            if (!user || !role) {
                return;
            }

            await user.roles.add(role);
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Role ${role.name} added to ${user.user.username}.`,
                    },
                },
            });
        } catch (error) {
            console.error('Error adding role:', error);
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'An error occurred while adding the role. Please try again.',
                    },
                },
            });
        }
    }
});


