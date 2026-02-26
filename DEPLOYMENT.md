# Guia de Deployment - LastWar Chip Guide

## 📋 Visão Geral

Este é um guia completo para fazer o deploy permanente da aplicação **LastWar Chip Guide** em diferentes plataformas.

## 🏗️ Estrutura do Projeto

```
lastwar-project/
├── client/              # Frontend React + Vite
├── server/              # Backend Express + tRPC
├── shared/              # Código compartilhado (tipos, dados)
├── dist/                # Build de produção
├── package.json         # Dependências do projeto
└── vite.config.ts       # Configuração do Vite
```

## 🚀 Opções de Deployment

### Opção 1: Vercel (Recomendado - Mais Fácil)

Vercel é a plataforma ideal para este tipo de aplicação full-stack.

**Pré-requisitos:**
- Conta no Vercel (vercel.com)
- Projeto no GitHub

**Passos:**

1. **Fazer push do código para GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/lastwar-chip-guide.git
   git push -u origin main
   ```

2. **Conectar ao Vercel**
   - Acesse https://vercel.com/new
   - Selecione "Import Git Repository"
   - Escolha seu repositório do GitHub
   - Clique em "Import"

3. **Configurar Variáveis de Ambiente**
   - Na aba "Environment Variables", adicione:
     - `OPENAI_API_KEY`: Sua chave de API (opcional, se usar análise com IA)
     - `DATABASE_URL`: URL do banco de dados (opcional)

4. **Deploy**
   - Clique em "Deploy"
   - Vercel fará o build automaticamente
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### Opção 2: Railway.app

Railway oferece deployment simples com banco de dados integrado.

**Pré-requisitos:**
- Conta no Railway (railway.app)
- Projeto no GitHub

**Passos:**

1. **Conectar ao Railway**
   - Acesse https://railway.app
   - Clique em "New Project"
   - Selecione "Deploy from GitHub"
   - Autorize e escolha seu repositório

2. **Configurar**
   - Railway detectará automaticamente o tipo de projeto
   - Adicione variáveis de ambiente conforme necessário
   - Clique em "Deploy"

### Opção 3: Docker + Heroku

Para mais controle sobre o ambiente.

**Pré-requisitos:**
- Docker instalado
- Conta no Heroku (heroku.com)
- Heroku CLI instalado

**Passos:**

1. **Criar Dockerfile**
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "run", "start"]
   ```

2. **Fazer login no Heroku**
   ```bash
   heroku login
   ```

3. **Criar aplicação**
   ```bash
   heroku create seu-app-name
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Opção 4: VPS (DigitalOcean, Linode, AWS)

Para máximo controle e customização.

**Pré-requisitos:**
- VPS com Node.js instalado
- SSH acesso ao servidor
- Domínio configurado

**Passos:**

1. **Conectar ao servidor**
   ```bash
   ssh root@seu-servidor.com
   ```

2. **Instalar dependências**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clonar repositório**
   ```bash
   cd /var/www
   git clone https://github.com/seu-usuario/lastwar-chip-guide.git
   cd lastwar-chip-guide
   npm install
   npm run build
   ```

4. **Configurar PM2**
   ```bash
   pm2 start dist/index.js --name "lastwar"
   pm2 startup
   pm2 save
   ```

5. **Configurar Nginx (opcional)**
   ```nginx
   server {
       listen 80;
       server_name seu-dominio.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 📦 Build Local

Para fazer build local e testar antes de fazer deploy:

```bash
# Instalar dependências
pnpm install

# Build de produção
pnpm build

# Testar build localmente
pnpm preview
```

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# OAuth (opcional)
VITE_OAUTH_URL=https://seu-oauth-provider.com
VITE_OAUTH_APP_ID=seu-app-id

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT=https://analytics.seu-dominio.com
VITE_ANALYTICS_WEBSITE_ID=seu-website-id

# API (opcional)
VITE_API_URL=https://seu-dominio.com/api
```

### Banco de Dados (se necessário)

Se precisar de persistência de dados:

1. **Criar banco de dados**
   - PostgreSQL recomendado
   - MySQL também suportado

2. **Configurar conexão**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/lastwar
   ```

3. **Executar migrations**
   ```bash
   pnpm db:migrate
   ```

## 🔒 Segurança

**Checklist de Segurança:**

- [ ] Usar HTTPS em produção
- [ ] Configurar CORS corretamente
- [ ] Adicionar rate limiting
- [ ] Validar todas as entradas
- [ ] Usar variáveis de ambiente para secrets
- [ ] Manter dependências atualizadas
- [ ] Configurar firewall
- [ ] Fazer backup regular dos dados

## 📊 Monitoramento

### Logs

```bash
# Ver logs em tempo real
pm2 logs lastwar

# Ver logs históricos
pm2 logs lastwar --lines 100
```

### Performance

- Monitorar uso de CPU e memória
- Configurar alertas para downtime
- Usar CDN para servir assets estáticos

## 🔄 Atualizações

Para atualizar a aplicação em produção:

```bash
# Fazer pull das mudanças
git pull origin main

# Reinstalar dependências se necessário
npm install

# Fazer novo build
npm run build

# Reiniciar aplicação
pm2 restart lastwar
```

## 🆘 Troubleshooting

### Erro: "Port 3000 already in use"
```bash
lsof -i :3000
kill -9 <PID>
```

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Out of memory"
```bash
# Aumentar limite de memória
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## 📞 Suporte

Para mais informações:
- Documentação do Vite: https://vitejs.dev
- Documentação do Express: https://expressjs.com
- Documentação do tRPC: https://trpc.io

## 📝 Notas

- A aplicação é totalmente funcional sem dependências externas de armazenamento
- Todos os dados dos heróis estão inclusos no código
- Não requer banco de dados para funcionar (opcional)
- Compatível com qualquer plataforma Node.js

---

**Última atualização:** Fevereiro 2026
**Versão:** 1.0.0
