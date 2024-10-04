# Aplicação de Gerenciamento de Tarefas

Esta é uma aplicação simples de gerenciamento de tarefas em full stack que permite aos usuários se registrarem, fazerem login, gerenciarem tarefas e recuperarem suas senhas. É construída usando Node.js para o backend e uma combinação de HTML, CSS e JavaScript (com Bootstrap) para o frontend.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

## Configuração do Banco de Dados

Você precisa criar um banco de dados MySQL chamado `db_task` com duas tabelas: `users` e `tasks`.

### SQL para Criar o Banco de Dados e as Tabelas:

-- Criar o banco de dados
CREATE DATABASE db_task;

-- Usar o banco de dados
USE db_task;

-- Criar a tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar a tabela de tarefas
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  task_text VARCHAR(100),
  task_status VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id)
);

### Backend
O backend é construído usando **Node.js** e **Express.js** e conecta-se a um banco de dados **MySQL**. Inclui endpoints de API RESTful para gerenciar registro de usuários, login, criação de tarefas, gerenciamento de tarefas e recuperação de senhas.

#### Principais Arquivos e Pastas:
- `server.js`: O ponto de entrada principal para o servidor backend.
- `config/`: Contém o arquivo de configuração do banco de dados.
- `controller/`: Contém a lógica para operações de usuário e tarefa.
- `model/`: Define os modelos de banco de dados para usuários e tarefas.
- `routes/`: Contém as rotas da API para operações de usuário e tarefa.
- `package.json`: Lista as dependências e scripts para o backend em Node.js.

### Frontend
O frontend fornece uma UI responsiva construída com **HTML**, **CSS**, **JavaScript** e **Bootstrap**. Permite que os usuários interajam com a aplicação através de várias páginas.

#### Principais Arquivos:
- `index.html`: Página principal de gerenciamento de tarefas onde os usuários podem visualizar e gerenciar suas tarefas.
- `login.html`: Página de login para autenticação do usuário.
- `register.html`: Página de registro de usuário.
- `new_task.html`: Página para criar uma nova tarefa.
- `edit_task.html`: Página para editar uma tarefa existente.
- `delete_task.html`: Página para deletar uma tarefa.
- `newPass.html`: Página para recuperação de senha.

## Recursos

### Backend:
- **Autenticação de Usuário**: Registrar e fazer login de usuários.
- **Gerenciamento de Tarefas**: Criar, atualizar, deletar e visualizar tarefas.
- **Recuperação de Senha**: Permite que os usuários recuperem suas senhas.

### Frontend:
- **Design Responsivo**: UI simples e limpa usando Bootstrap.
- **Gerenciamento de Tarefas**: Adicionar, editar, deletar e filtrar tarefas.
- **Autenticação de Usuário**: Fazer login e registrar usuários através de formulários.

## Instalação

### Backend
1. Navegue até a pasta `backend`:
   ``bash
        cd/backend
   ``

2. Instale as dependências necessárias executando:
      ``bash
       npm install
     ``

### Configuração do Frontend
Para executar o frontend, é recomendável usar a extensão **Live Server** no **VS Code** para fácil hospedagem local.

### Passos:
1. Abra a pasta `frontend` no VS Code.
2. Instale a [extensão Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) se ainda não o fez.
3. Clique com o botão direito em `index.html` (ou em qualquer outro arquivo HTML) e selecione **"Open with Live Server"**.
4. Seu navegador padrão será aberto automaticamente e você poderá interagir com a aplicação.

Esse método garante uma experiência de desenvolvimento suave com recarregamento ao vivo dos seus arquivos HTML, CSS e JavaScript.

