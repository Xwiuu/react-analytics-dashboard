# 📊 AnalyticsDash

> Um painel de analytics responsivo, interativo e moderno, construído com React, Vite, Tailwind CSS e Recharts.

Este projeto foi desenvolvido como uma demonstração de habilidades full-stack (com um backend simulado), cobrindo desde a autenticação de usuário até a visualização de dados complexos com filtros dinâmicos e um tema dark.

---

### 📸 Pré-visualização

[INCLUA AQUI UM GIF OU SCREENSHOT DO SEU DASHBOARD FUNCIONANDO]

*Dica: Um GIF mostrando o login, a troca de tema e os filtros em ação é extremamente impactante!*

---

### ✨ Funcionalidades Principais

* 🔐 **Autenticação Completa:** Sistema de login com validação e proteção de rotas. Rotas privadas só são acessíveis por usuários autenticados.
* 📈 **Visualização de Dados:**
    * Cards de KPI (Key Performance Indicators) para resumos rápidos.
    * Gráfico de Linha interativo para analisar tendências ao longo do tempo.
    * Gráfico de Pizza para visualizar a distribuição de dados por categoria.
* 🔄 **Filtros Dinâmicos:** Filtre todos os dados do dashboard por período (Geral, Últimos 7 dias, Últimos 30 dias) com atualização instantânea de todos os componentes.
* 📄 **Tabela de Dados Reativa:** Uma tabela detalhada que também responde aos filtros de período.
* 🌙 **Modo Dark:** Um seletor de tema Light/Dark/System, com a preferência do usuário salva localmente.
* 📱 **Design Responsivo:** Interface construída com Tailwind CSS que se adapta a diferentes tamanhos de tela.

---

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e ferramentas:

**Frontend:**
* **React:** Biblioteca principal para a construção da UI.
* **Vite:** Ferramenta de build e desenvolvimento extremamente rápida.
* **Tailwind CSS:** Framework CSS para estilização ágil e moderna.
* **shadcn/ui:** Coleção de componentes de UI reusáveis e acessíveis.
* **Recharts:** Biblioteca para a criação de gráficos declarativos em React.
* **React Router DOM:** Para gerenciamento de rotas e navegação.
* **Axios:** Cliente HTTP para fazer as chamadas à API.
* **Lucide React:** Biblioteca de ícones.
* **next-themes:** Para gerenciamento do Modo Dark.

**Backend (Simulado) & Ferramentas:**
* **JSON Server:** Para criar uma API REST fake completa de forma rápida.
* **NPM:** Gerenciador de pacotes.

---

### 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [Git](https://git-scm.com/)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a API Fake (Backend):**
    * Abra um **primeiro terminal** e rode o comando:
    ```bash
    npm run json-server
    ```
    * O servidor da API estará rodando em `http://localhost:3001`. Deixe este terminal aberto.

4.  **Inicie a Aplicação React (Frontend):**
    * Abra um **segundo terminal** e rode o comando:
    ```bash
    npm run dev
    ```
    * A aplicação estará disponível em `http://localhost:5173`.

5.  **Faça o login:**
    * Use as credenciais definidas no arquivo `db.json`:
    * **Email:** `irmao@dev.com`
    * **Senha:** `123`

---

### 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.