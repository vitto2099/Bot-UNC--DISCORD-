# 🤖 Bot Criador de Servidor para Discord

<p align="center">
  Um bot para Discord que <b>cria automaticamente um servidor completo</b> com cargos, categorias, canais e mensagens fixadas, pronto para equipes de desenvolvimento, design e aprendizado.
</p>

---

## ✨ Funcionalidades

- ✅ Criação automática de **cargos** com cores e permissões.
- ✅ Criação de **categorias** e **canais de texto e voz**.
- 📌 Mensagens fixadas explicando o propósito de cada canal.
- 🔒 Permissões especiais em canais de anúncios.
- 🔗 Criação de **webhook de exemplo** para GitHub.

---

## ⚙️ Pré-requisitos

- **Node.js**: Versão 18 ou superior.
- **Bot Discord**: Com as seguintes intents ativadas no Portal de Desenvolvedor:
  - `Guilds`
  - `GuildMembers`
  - `GuildMessages`
- **Permissões**: O bot precisa de permissão de **Administrador** no servidor para garantir que consiga criar cargos, canais e webhooks sem problemas.

---

## 🚀 Como Usar

1.  **Clone o repositório** para sua máquina local.

2.  **Crie um arquivo `.env`** na raiz do projeto com as seguintes variáveis:
    ```
    BOT_TOKEN=seu_token_aqui
    GUILD_ID=id_do_servidor_onde_o_bot_vai_agir
    ```

3.  **Instale as dependências** abrindo o terminal na pasta do projeto e rodando:
    ```sh
    npm install
    ```

4.  **Execute o bot** para iniciar a criação do servidor:
    ```sh
    node createServer.js
    ```

O bot irá executar a criação e depois se desligará.

---

## 🏗️ Estrutura do Servidor Criado

### 📋 Categorias e Canais

- **INICIAL E GERAL**
  - `#🐾-boas-vindas`: Mensagem de boas-vindas e links importantes.
  - `#📢-anuncios-gerais`: Canal oficial para anúncios (apenas admins podem enviar).
  - `#💬-geral`: Bate-papo geral entre membros.
  - `#🤔-sugestoes-e-feedback`: Sugestões e feedbacks sobre projetos e servidor.

- **EQUIPES E ÁREAS**
  - `#🧠-lideranca-e-gestao`: Discussões sobre gestão e liderança.
  - `#📊-bi-e-dados`: Canal do time de BI & Dados.
  - `#⚙️-backend`: Canal do time de Backend.
  - `#🎨-frontend`: Canal do time de Frontend.
  - `#✨-design-ui-ux`: Canal do time de Design e UX/UI.

- **DESENVOLVIMENTO E TECNOLOGIA**
  - `#🔧-desenvolvimento-geral`: Discussões sobre desenvolvimento e tecnologias.
  - `#🐞-bugs-e-problemas`: Reporte de bugs com template.
  - `#📚-documentacao`: Documentações técnicas e guias.
  - `#🔒-github-e-deploy`: Notificações de GitHub ou deploys (com webhook).

- **PROJETO E METODOLOGIA**
  - `#✅-tarefas-e-entregas`: Acompanhamento de tarefas e entregas.
  - `#📅-cronograma-e-prazos`: Planejamento de cronogramas e prazos.
  - `#🔄-stand-ups`: Template para stand-ups diários.

- **APRENDIZADO E RECURSOS**
  - `#📖-plano-de-estudos`: Plano de estudos e checkpoints.
  - `#💡-dicas-e-tutoriais`: Dicas e tutoriais úteis.
  - `#✅-checkpoints-e-portfolio`: Portfólios e checkpoints de membros.

### 🔊 Canais de Voz

- 🔵 Reunião Geral
- 🔵 Pair Programming — BI
- 🔵 Pair Programming — Backend
- 🔵 Pair Programming — Frontend
- 🔵 Sala Social

### 👤 Cargos (Roles)

- Lead / Admin (Administrador)
- Gerente de Projeto
- BI & Dados
- Backend
- Frontend
- Design / UX
- QA
- Membro
- Convidado

---

## ⚠️ Observações Importantes

- Mensagens fixadas são adicionadas automaticamente para explicar a função de cada canal.
- O webhook de GitHub é criado apenas se o canal `🔒-github-e-deploy` for gerado com sucesso.
- É recomendado revisar as permissões dos cargos no seu servidor Discord após a execução do bot para ajustes finos.
