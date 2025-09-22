import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  console.log('Resetando servidor:', guild.name);

  // apagar canais
  for (const [, channel] of guild.channels.cache) {
    try {
      await channel.delete();
      console.log('Canal apagado:', channel.name);
    } catch {}
  }

  // apagar roles (menos @everyone)
  for (const [, role] of guild.roles.cache) {
    if (role.name !== '@everyone') {
      try {
        await role.delete();
        console.log('Role apagada:', role.name);
      } catch {}
    }
  }

  console.log('Reset concluído ✅');
  process.exit(0);
});

client.login(process.env.BOT_TOKEN);
