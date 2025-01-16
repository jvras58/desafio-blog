# Blog - desafio Vlab

## 📖 Sobre o Projeto
O projeto implementa um sistema de blog com autenticação, painel administrativo e gerenciamento de conteúdo

## 🚀 Tecnologias e Ferramentas

Este projeto foi desenvolvido utilizando **Next.js** com **shadcn/UI** para componentização e **Express** como back-end e gerenciamento de dados.

### Stack do Projeto

Este projeto é uma aplicação web que utiliza **Next.js**, um framework React focado em renderização do lado servidor e funcionalidades modernas de desenvolvimento web.

As tecnologias utilizadas são:

| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v18.x.x          |
| **Framework**         |                  |
| Next.js               | v13.x.x          |
| **Banco de Dados**    |                  |
| prisma                | v9.x.x           |
| **Devtime**           |                  |
| npm                   | v9.x.x           |

## 🚀 Características Principais
##  Arquitetura e Padrões
 - Arquitetura Moderna: Utiliza App Router do Next.js 14
 - Server Components: Maximiza performance com React Server Components
 - API Routes: Sistema de rotas API integrado
 - TypeScript: Tipo seguro em toda a base de código
 - React Hook Form: Gerenciamento avançado de formulários
 - Zod: Validação de dados type-safe

## Autenticação e Segurança
 - NextAuth.js: Sistema de autenticação
 - Roles e Permissões: Controle de acesso baseado em funções
 - JWT: Tokens seguros para autenticação
 - Middleware: Proteção de rotas sensíveis

### 🏗 Arquitetura do Projeto
- 📁 app: Rotas e páginas (Next.js 14 App Router)
- 📁 components: Componentes React reutilizáveis
- 📁 actions: Server Actions do Next.js
- 📁 lib: Utilitários e configurações
- 📁 schemas: Validações Zod
- 📁 services: Lógica de negócios
- 📁 prisma: Modelo de dados e migrações
```
    /
    ├── 📄README.md
    ├── 🇹 auth.config.ts
    ├── 🇹 auth.ts
    ├── {} biome.json
    ├── {} components.json
    ├── docker-compose.yml
    ├── 🇹 middleware.ts
    ├── 𝓝 next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── 🇹 tailwind.config.ts
    ├── ⚛ theme.config.tsx
    ├── {} tsconfig.json
    ├── .env.example
    ├── 📁 actions/
    │   └── 📁 auth/
    │       ├── 🇹 index.ts
    │       ├── 📁 login/
    │       │   └── 🇹 index.ts
    │       ├── 📁 register/
    │       │   └── 🇹 index.ts
    │       ├── 📁 settings/
    │       │   └── 🇹 index.ts
    │       └── 📁 users/
    │           └── 🇹 index.ts
    ├── 📁 app/
    │   ├── globals.css
    │   ├── ⚛ layout.tsx
    │   ├── ⚛ not-found.tsx
    │   ├── 📁 api/
    │   │   ├── 📁 auth/
    │   │   │   └── 📁 [...nextauth]/
    │   │   │       └── 🇹 route.ts
    │   │   └── 📁 protected-api/
    │   │       └── 🇹 route.ts
    │   ├── 📁 auth/
    │   │   ├── 📁 login/
    │   │   │   └── ⚛ page.tsx
    │   │   ├── 📁 register/
    │   │   │   └── ⚛ page.tsx
    │   │   ├── 📁 settings/
    │   │   │   └── ⚛ page.tsx
    │   │   └── 📁 users/
    │   │       └── ⚛ page.tsx
    │   ├── 📁 posts/
    │   │   ├── ⚛ page.tsx
    │   │   └── 📁 new/
    │   │       └── ⚛ page.tsx
    │   ├── 📁 dashboard/
    │   │   └── ⚛ page.tsx
    │   └── 📁 tags/
    │       └── ⚛ page.tsx
    ├── 📁 assets/
    ├── 📁 components/
    │   ├── theme-toggle.tsx
    │   ├── 📁 auth/
    │   │   ├── ⚛ auth-card.tsx
    │   │   ├── ⚛ auth-form-message.tsx
    │   │   ├── ⚛ forbidden.tsx
    │   │   ├── ⚛ login-button.tsx
    │   │   ├── ⚛ login-form.tsx
    │   │   ├── ⚛ logout-button.tsx
    │   │   ├── ⚛ register-form.tsx
    │   │   ├── ⚛ user-settings-form.tsx
    │   │   ├── ⚛ users-stats.tsx
    │   │   └── ⚛ users-table.tsx
    │   ├── 📁 posts/
    │   │   ├── ⚛ posts-content.tsx
    │   │   └── 📁 _components/
    │   │       ├── ⚛ posts-form.tsx
    │   │       ├── ⚛ xxxxxxxx.tsx
    │   │       ....
    │   │             
    │   ├── 📁 controller/
    │   │   └── ⚛ user-content.tsx
    │   ├── 📁 demo/
    │   │   └── ⚛ placeholder-content.tsx
    │   ├── 📁 icons/
    │   │   └── ⚛ index.tsx
    │   ├──📁  painel/
    │   │   ├── ⚛ collapse-menu-button.tsx
    │   │   ├── ⚛ content-layout.tsx
    │   │   ├── ⚛footer.tsx
    │   │   ├── ⚛ menu.tsx
    │   │   ├── ⚛ navbar.tsx
    │   │   ├── ⚛ painel-layout.tsx
    │   │   ├── ⚛ sheet-menu.tsx
    │   │   ├── ⚛ sidebar-toggle.tsx
    │   │   ├── ⚛ sidebar.tsx
    │   │   └── ⚛ user-nav.tsx
    │   ├──📁  providers/
    │   │   └── ⚛ theme-provider.tsx
    │   ├──📁  settings/
    │   │   └── ⚛ settings-content.tsx
    │   ├──📁  sidebar/
    │   │   ├── ⚛ SidebarSettings.tsx
    │   │   └── ⚛ sidebar.tsx
    │   ├──📁  ui/
    │   │   ├── ⚛ xxxx.tsx
    │   │   ....
    ├── 📁 config/
    │   └── routes/
    │       └── 🇹 index.ts
    ├── 📁 constants/
    │   └── 📁 framer-motion/
    │       └── 🇹 index.ts
    ├── 📁 hooks/
    │   ├── ⚛ use-current-role.tsx
    │   ├── ⚛ use-current-user.tsx
    │   ├── ⚛ use-media-query.tsx
    │   ├── ⚛ use-mobile.tsx
    │   ├── ⚛ 🇹 use-sidebar.ts
    │   ├── ⚛ 🇹 use-store.ts
    ├── 📁 lib/
    │   ├── 🇹 db.ts
    │   ├── 🇹 menu-list.ts
    │   ├── ⚛ use-forwarded-ref.tsx
    │   ├── 🇹 utils.ts
    │   ├── 📁 auth/
    │   │   ├── 🇹 index.ts
    │   │   ├── 🇹 invalid-credentials.ts
    │   │   └── 🇹 user-not-found.ts
    │   └── 📁 route/
    │       └── 🇹 index.ts
    ├── 📁 pages/
    │   ├── _app.tsx
    │   ├── _meta.tsx
    │   └── 📁 docs/
    │       ├── _meta.tsx
    │       ├── about.mdx
    │       ├── checklist.mdx
    │       └── index.mdx
    ├── 📁 prisma/
    │   ├── {} schema.prisma
    │   ├── 🇹 seed.ts
    │   └── 📁 migrations/
    │       ├── migration_lock.toml
    │       └── xxxxxxxxxxx_init/
    │           └── migration.sql
    ├── 📁 public/
    │   ├── 📁 assets/
    │   └── 📁 images/
    │       ├── 📁 icon/
    │       └── 📁 logo/
    ├── 📁 schemas/
    │   └── 📁 auth/
    │       └── index.ts
    ├── 📁 services/
    │   ├── index.ts
    │   └── 📁 auth/
    │       ├── index.ts
    │       └── password-reset/
    │           └── index.ts
    └── 📁 types/
        ├── 🇹 environment.d.ts
        ├── 🇹 next-auth.d.ts
        ├── 📁 multi-step-form/
        │   └── 🇹 index.ts
        ├── 📁 routes/
        │   └── 🇹 index.ts
        └── 📁 shared/
            └── 🇹 index.ts
```

## ⚙️ Instalação e Configuração

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/repositorio-sample.git
   cd repositorio-sample
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` na raiz do projeto com suas credenciais use o arquivo `env-example`

4. Sincronize o banco de dados:
   ```bash
   npm run db:push
   ```

5. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
   > O servidor será iniciado em modo de desenvolvimento com hot-reload

6. Visualize o Homepage:
   ```
   http://localhost:3000/dashboard
   ```
   > A página principal do dashboard será carregada

7. Para acessar a áreas restritas como o dashboard:
   ```
   http://localhost:3000/auth/login
   ```
   > Utilize as credenciais definidas no arquivo 

    .env:
   > - Email: user@nextmail.com
   > - Senha: 123456

📝 **Observação**: Certifique-se de que todas as variáveis de ambiente estejam configuradas corretamente no arquivo 
.env antes de iniciar a aplicação.


## 💻 Funcionalidades Principais


## 📝 CHECKLIST:

[Checklist](docs\CHECKLIST.MD)

## 📝 Autor

- **jvras**

## 📜 Licença

Este projeto ainda não possui licença definida.

## 📖 Documentação

[Next.js 14](https://nextjs.org/docs/14/getting-started)

[Next.js caching](https://nextjs.org/docs/app/building-your-application/caching)

[Server Actions](https://react.dev/reference/rsc/server-actions)

[UseQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)


