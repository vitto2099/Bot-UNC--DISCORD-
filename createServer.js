/**
 * createServer.js
 * Uso: colocar BOT_TOKEN e GUILD_ID em .env e rodar `node createServer.js`
 *
 * Atenção: o bot precisa das intents Guilds, GuildMembers, GuildMessageReactions.
 * Convide com permissões suficientes (ou ADMIN para facilitar).
 */

import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  Partials,
  ChannelType,
  PermissionFlagsBits
} from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const GUILD_ID = process.env.GUILD_ID;
if (!process.env.BOT_TOKEN || !GUILD_ID) {
  console.error('Faltando BOT_TOKEN ou GUILD_ID no .env');
  process.exit(1);
}

const structure = {
  roles: [
    { key: 'lead', name: 'Lead / Admin', color: 0xFF4D4D, admin: true },
    { key: 'gerente', name: 'Gerente de Projeto', color: 0xFF8A00 },
    { key: 'bi', name: 'BI & Dados', color: 0x2ECC71 },
    { key: 'backend', name: 'Backend', color: 0x2D6CDF },
    { key: 'frontend', name: 'Frontend', color: 0x63C0FF },
    { key: 'design', name: 'Design / UX', color: 0x8A2BE2 },
    { key: 'qa', name: 'QA', color: 0xFFD400 },
    { key: 'member', name: 'Membro', color: 0x95A5A6 },
    { key: 'guest', name: 'Convidado', color: 0xBDC3C7 },
  ],
  categories: [
    {
      name: '📋 INICIAL E GERAL',
      channels: [
        { 
          name: '🐾-boas-vindas', 
          type: 'text', 
          pin: true, 
          pinMessage: `Bem-vindo(a) ao servidor! Aqui você encontra informações iniciais e links importantes. Se apresente para a comunidade.` 
        },
        { 
          name: '📢-anuncios-gerais', 
          type: 'text',
          pin: true,
          pinMessage: 'Canal exclusivo para anúncios oficiais do servidor. Apenas administradores podem enviar mensagens aqui.'
        },
        { 
          name: '💬-geral', 
          type: 'text', 
          pin: true,
          pinMessage: 'Espaço para conversas gerais, bate-papo e integração entre membros.'
        },
        { 
          name: '🤔-sugestoes-e-feedback', 
          type: 'text', 
          pin: true,
          pinMessage: 'Canal para sugestões e feedbacks sobre o servidor ou projetos internos. Compartilhe suas ideias!'
        },
      ]
    },
    {
      name: '👥 EQUIPES E ÁREAS',
      channels: [
        { 
          name: '🧠-lideranca-e-gestao', 
          type: 'text', 
          pin: true,
          pinMessage: 'Discussões de liderança, planejamento e gestão de equipes.'
        },
        { 
          name: '📊-bi-e-dados', 
          type: 'text',
          pin: true,
          pinMessage: 'Canal para equipe de BI & Dados: análises, relatórios e insights.'
        },
        { 
          name: '⚙️-backend', 
          type: 'text',
          pin: true,
          pinMessage: 'Discussão e coordenação do time de Backend.'
        },
        { 
          name: '🎨-frontend', 
          type: 'text',
          pin: true,
          pinMessage: 'Canal para comunicação do time de Frontend.'
        },
        { 
          name: '✨-design-ui-ux', 
          type: 'text',
          pin: true,
          pinMessage: 'Espaço para Designers e UX/UI discutirem e compartilharem ideias.'
        },
      ]
    },
    {
      name: '💻 DESENVOLVIMENTO E TECNOLOGIA',
      channels: [
        { 
          name: '🔧-desenvolvimento-geral', 
          type: 'text',
          pin: true,
          pinMessage: 'Discussões gerais sobre desenvolvimento, frameworks, boas práticas e tecnologias.'
        },
        { 
          name: '🐞-bugs-e-problemas', 
          type: 'text', 
          pin: true, 
          pinMessage: `Reporte bugs ou problemas aqui usando o template: Título | Stack | Passos | Resultado` 
        },
        { 
          name: '📚-documentacao', 
          type: 'text',
          pin: true,
          pinMessage: 'Documentações técnicas e guias do servidor ou projetos internos.'
        },
        { 
          name: '🔒-github-e-deploy', 
          type: 'text',
          pin: true,
          pinMessage: 'Notificações automáticas de GitHub ou deploys. Não é para conversas.'
        },
      ]
    },
    {
      name: '🗓️ PROJETO E METODOLOGIA',
      channels: [
        { 
          name: '✅-tarefas-e-entregas', 
          type: 'text',
          pin: true,
          pinMessage: 'Acompanhe tarefas, prazos e entregas dos projetos aqui.'
        },
        { 
          name: '📅-cronograma-e-prazos', 
          type: 'text',
          pin: true,
          pinMessage: 'Planejamento de cronogramas e prazos importantes do time.'
        },
        { 
          name: '🔄-stand-ups', 
          type: 'text', 
          pin: true, 
          pinMessage: `Template de stand-up: 1) O que fiz 2) O que faço 3) Bloqueios` 
        },
      ]
    },
    {
      name: '🎓 APRENDIZADO E RECURSOS',
      channels: [
        { 
          name: '📖-plano-de-estudos', 
          type: 'text', 
          pin: true,
          pinMessage: 'Plano de estudos do time, checkpoints e referências.'
        },
        { 
          name: '💡-dicas-e-tutoriais', 
          type: 'text',
          pin: true,
          pinMessage: 'Compartilhe dicas, tutoriais e recursos de aprendizado.'
        },
        { 
          name: '✅-checkpoints-e-portfolio', 
          type: 'text',
          pin: true,
          pinMessage: 'Espaço para mostrar checkpoints e portfólios dos membros.'
        },
      ]
    },
    {
      name: '🔊 CANAIS DE VOZ',
      channels: [
        { name: 'Reunião Geral', type: 'voice' },
        { name: 'Pair Programming — BI', type: 'voice' },
        { name: 'Pair Programming — Backend', type: 'voice' },
        { name: 'Pair Programming — Frontend', type: 'voice' },
        { name: 'Sala Social', type: 'voice' },
      ]
    },
  ]
};

client.once('ready', async () => {
  console.log('Bot pronto:', client.user.tag);
  const guild = await client.guilds.fetch(GUILD_ID);
  if (!guild) {
    console.error('Guild não encontrada:', GUILD_ID);
    process.exit(1);
  }

  // 1) Criar roles
  const createdRoles = {};
  for (const r of structure.roles) {
    try {
      const role = await guild.roles.create({
        name: r.name,
        color: r.color,
        permissions: r.admin ? [PermissionFlagsBits.Administrator] : []
      });
      createdRoles[r.key] = role;
      console.log('Role criada:', r.name);
    } catch (err) {
      console.error('Erro criando role', r.name, err);
    }
  }

  // 2) Criar categorias e canais
  for (const cat of structure.categories) {
    const category = await guild.channels.create({
      name: cat.name,
      type: ChannelType.GuildCategory
    });

    for (const ch of cat.channels) {
      const baseOptions = {
        name: ch.name,
        parent: category.id,
        type: ch.type === 'text' ? ChannelType.GuildText : ChannelType.GuildVoice,
        permissionOverwrites: [
          {
            id: guild.roles.everyone.id,
            allow: [PermissionFlagsBits.ViewChannel],
          }
        ]
      };

      // special: announcements — allow view but only admins can send
      if (ch.name === '📢-anuncios-gerais') {
        baseOptions.permissionOverwrites = [
          { id: guild.roles.everyone.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] },
          { id: createdRoles.lead.id, allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages] }
        ];
      }

      const created = await guild.channels.create(baseOptions);
      console.log('Canal criado:', created.name);

      // Pins automáticos
      if (ch.pin && ch.pinMessage) {
        try {
          const m = await created.send(ch.pinMessage);
          await m.pin();
          console.log('Mensagem fixada em', created.name);
        } catch (err) {
          console.warn('Não foi possível fixar em', created.name, err.message);
        }
      }
    }
  }

  // 3) Criar webhook exemplo para GitHub no canal github-e-deploy (se existir)
  try {
    const deployChannel = guild.channels.cache.find(c => c.name === '🔒-github-e-deploy' && c.type === ChannelType.GuildText);
    if (deployChannel) {
      const webhook = await deployChannel.createWebhook({
        name: 'GitHub Webhook',
        reason: 'Notificações de PR/CI'
      });
      console.log('Webhook criado (cole no GitHub):', webhook.url);
    }
  } catch (err) {
    console.warn('Erro criando webhook:', err.message);
  }

  console.log('Tudo criado. Revise permissões e roles no Discord se necessário.');
  process.exit(0);
});

client.login(process.env.BOT_TOKEN);
