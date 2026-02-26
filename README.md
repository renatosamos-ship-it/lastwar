# 🎮 LastWar Chip Guide - Guia Prático de Chips de Combate

Um guia completo e interativo para jogadores de **LastWar Survival**, com informações sobre chips de drone, heróis, esquadrões e estratégias de combate.

## ✨ Funcionalidades

### 🔧 Chip de Drone
- **Visão Geral**: Entenda o sistema de chips
- **Tipos de Chips**: Attack, Defense, Movement, Interference
- **Produção**: Guia completo sobre como produzir chips
- **Equipar**: Dicas de como equipar chips nos drones
- **Obtenção**: Onde conseguir chips no jogo
- **Análise com IA**: Análise automática de chips usando Gemini LLM

### 🎯 Esquadrão
- **Guia de Montagem**: Aprenda a montar esquadrões competitivos
- **Simulador de Formações**: Teste diferentes composições
- **Analisador de Esquadrão**: Faça upload de prints para análise
- **Calculadora de Progresso**: Calcule seu progresso
- **Estratégias**: 3 estratégias principais (Pura, Híbrida, Ofensiva)
- **Formações**: 4 formações competitivas

### ⚔️ Heróis
- **Lista Completa**: 24+ heróis com imagens e informações
- **Filtro por Tier**: S+, S, A+, A, B+, B, D
- **Filtro por Tipo**: Tank, Air, Missile
- **Analisador Individual**: Análise detalhada de cada herói
- **Dicas Úteis**: Recomendações para desenvolvimento

## 🚀 Começar Rápido

### Pré-requisitos
- Node.js 22+
- pnpm (ou npm)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/lastwar-chip-guide.git
cd lastwar-chip-guide

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build de Produção

```bash
# Fazer build
pnpm build

# Testar build localmente
pnpm preview
```

## 📁 Estrutura do Projeto

```
lastwar-chip-guide/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── data/          # Dados dos heróis
│   │   └── lib/           # Utilitários
│   └── public/            # Assets estáticos
├── server/                 # Backend Express + tRPC
│   ├── routers/           # Rotas tRPC
│   ├── utils/             # Utilitários
│   └── _core/             # Core do servidor
├── shared/                 # Código compartilhado
│   └── heroes.ts          # Dados dos heróis
├── dist/                   # Build de produção
└── package.json           # Dependências
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19**: UI library
- **Vite**: Build tool
- **TypeScript**: Type safety
- **TailwindCSS**: Styling
- **Radix UI**: Component library
- **tRPC**: Type-safe API calls

### Backend
- **Express**: Web framework
- **tRPC**: RPC framework
- **Drizzle ORM**: Database ORM
- **Gemini LLM**: AI analysis

### Deployment
- **Vercel**: Recomendado
- **Railway**: Alternativa
- **Docker**: Para VPS
- **Heroku**: Alternativa

## 📖 Documentação

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia completo de deployment
- [API Documentation](./server/README.md) - Documentação da API
- [Component Guide](./client/README.md) - Guia de componentes

## 🎯 Roadmap

- [ ] Integração com banco de dados
- [ ] Sistema de usuários e autenticação
- [ ] Galeria de builds comunitária
- [ ] Calculadora avançada de DPS
- [ ] Guia de eventos
- [ ] Integração com Discord
- [ ] App mobile

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para a comunidade LastWar

## 🙏 Agradecimentos

- Comunidade LastWar
- Todos os contribuidores
- Inspiração de outros guias de jogos

## 📞 Contato

- 📧 Email: seu-email@example.com
- 🐦 Twitter: @seu-twitter
- 💬 Discord: seu-servidor

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma issue em [GitHub Issues](https://github.com/seu-usuario/lastwar-chip-guide/issues)

---

**Versão:** 1.0.0  
**Última atualização:** Fevereiro 2026  
**Status:** ✅ Produção
