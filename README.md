# EzDispenser - Desafio Técnico Angular (Estágio)

Entrega do desafio técnico para a vaga de estágio na EZ.Dispenser. O projeto consiste em um dashboard de vendas com autenticação completa (feito com Tailwind CSS).

## 🚀 Como Rodar

1.  **Pré-requisitos:** Node.js (v18+) e Angular CLI.
2.  **Instalação:**
    ```bash
    npm install
    ```
3.  **Execução:**
    ```bash
    ng serve
    ```
4.  **Acesso:** Abra `http://localhost:4200` no navegador.

## 👤 Usuário de Teste & Códigos

Como o backend é simulado (`ApiMockService`), use as seguintes credenciais para testar todos os fluxos:

- **Login Admin (Seed):**
  - Email: `admin@ez.com`
  - Senha: `123456`

- **Novos Usuários:**
  - Crie uma conta na tela "Criar Conta". O login só funcionará se a conta existir!

- **Códigos de Validação (Mock):**
  - Para **Criar Conta** ou **Redefinir Senha**, o código SMS/Email simulado é sempre: **`123456`**.

## 🛠️ Decisões Técnicas

1.  **Tailwind CSS:** Optei por utilizar o Tailwind CSS (v3). Motivo: Mais agilidade na estilização, bundle menor e visual mais moderno ("Premium") alinhado com tendências de mercado.
2.  **Arquitetura Modular:**
    - `CoreModule`: Singletons, Services, Guards (Auth, Storage).
    - `AuthModule`: Telas de Login, Recuperação e Cadastro (Lazy Loaded).
    - `DashboardModule`: Área protegida (Lazy Loaded).
    - `SharedModule`: Componentes reutilizáveis de formulário (`InputText`, `InputPassword`, `InputEmail`) para garantir _DRY_ (Don't Repeat Yourself) e padronização visual.
3.  **Gerenciamento de Estado (Local):**
    - Uso de `BehaviorSubject`, `switchMap` e `concat(of(null))` no Dashboard para gerenciar o estado de filtargem (7 vs 30 dias) e loading de forma reativa e declarativa (sem `subscribe` dentro do subscribe).
4.  **Autenticação e Segurança:**
    - Implementação JWT-like simulada. O token é persistido no `localStorage`.
    - **Funcionalidade Extra:** Usuários podem excluir suas próprias contas (com proteção especial para impedir a exclusão do usuário Admin).
    - **Segurança Reforçada:** Bloqueio de cadastro com email reservado (`admin@ez.com`) e prevenção de sobrescrita de contas existentes.

## 🔮 Melhorias Futuras (Backlog)

- **Testes Unitários:** Implementar arquivos `.spec.ts` para os Services e Componentes críticos (atualmente foram pulados para focar na entrega funcional).
- **Interceptor:** Criar um `HttpInterceptor` real para injetar o token no header (hoje não é necessário pois o Mock ignora headers).
- **Máscaras:** Adicionar máscaras de input para campos como telefone/CPF (se houver no futuro).

---

**Desenvolvido por:** Marcio Fernande Silva
**Dúvidas?** (31) 98622-0837
