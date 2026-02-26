# 🚀 Guia Rápido de Deployment

Escolha a opção mais adequada para você:

## ⚡ Opção 1: Vercel (Mais Fácil - Recomendado)

**Tempo: ~5 minutos**

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Conecte seu repositório GitHub
4. Clique em "Deploy"
5. Pronto! Seu site estará em `https://seu-projeto.vercel.app`

**Vantagens:**
- ✅ Sem configuração
- ✅ Deploy automático
- ✅ SSL grátis
- ✅ Escalabilidade automática

---

## 🐳 Opção 2: Docker + Railway

**Tempo: ~10 minutos**

1. Acesse https://railway.app
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Autorize e escolha seu repositório
5. Railway fará o deploy automaticamente

**Vantagens:**
- ✅ Muito simples
- ✅ Banco de dados integrado
- ✅ Bom para iniciantes

---

## 🖥️ Opção 3: Docker Local

**Para testar localmente:**

```bash
# Construir imagem
docker build -t lastwar-chip-guide .

# Rodar container
docker run -p 3000:3000 lastwar-chip-guide

# Acessar em http://localhost:3000
```

**Com banco de dados:**

```bash
# Rodar com docker-compose
docker-compose up

# Acessar em http://localhost:3000
```

---

## 📦 Opção 4: Node.js Direto (VPS)

**Para DigitalOcean, Linode, AWS, etc:**

```bash
# 1. Conectar ao servidor
ssh root@seu-servidor.com

# 2. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clonar projeto
cd /var/www
git clone https://github.com/seu-usuario/lastwar-chip-guide.git
cd lastwar-chip-guide

# 4. Instalar dependências
npm install

# 5. Fazer build
npm run build

# 6. Instalar PM2
sudo npm install -g pm2

# 7. Iniciar aplicação
pm2 start dist/index.js --name "lastwar"
pm2 startup
pm2 save

# 8. Configurar Nginx (opcional)
sudo apt-get install -y nginx
# Editar /etc/nginx/sites-available/default
# Adicionar proxy para localhost:3000
```

---

## 🔑 Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite conforme necessário:

```env
NODE_ENV=production
PORT=3000
# Adicione outras variáveis conforme necessário
```

---

## ✅ Checklist de Deployment

- [ ] Código está no GitHub
- [ ] Build local funciona (`pnpm build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio apontando para o servidor (se necessário)
- [ ] SSL/HTTPS configurado
- [ ] Backups configurados (se usar banco de dados)
- [ ] Monitoramento ativo

---

## 🆘 Troubleshooting

### Erro: "Port already in use"
```bash
lsof -i :3000
kill -9 <PID>
```

### Erro: "Module not found"
```bash
rm -rf node_modules
npm install
npm run build
```

### Erro: "Out of memory"
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## 📞 Precisa de Ajuda?

- 📖 Leia [DEPLOYMENT.md](./DEPLOYMENT.md) para mais detalhes
- 🐛 Abra uma issue no GitHub
- 💬 Pergunte na comunidade

---

**Dica:** Comece com Vercel para testar. Depois migre para outra plataforma se necessário.
