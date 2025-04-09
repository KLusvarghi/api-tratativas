# 📚 API REST com Express e MongoDB

Uma API REST completa para gerenciamento de livros e autores, construída com Node.js, Express e MongoDB, com foco em tratamento de erros avançado.

## 📋 Sobre o Projeto

Este projeto implementa uma API RESTful para gerenciamento de livros e autores utilizando Node.js, Express e MongoDB. O foco principal está na construção de um CRUD completo com tratamento de erros sofisticado, middlewares especializados e consultas avançadas ao banco de dados.

### 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript do lado do servidor
- **Express** - Framework web rápido e minimalista para Node.js
- **MongoDB** - Banco de dados NoSQL orientado a documentos
- **Mongoose** - Biblioteca de modelagem de dados para MongoDB
- **Dotenv** - Carregamento de variáveis de ambiente
- **Nodemon** - Utilitário que monitora alterações e reinicia o servidor automaticamente

## 🗂️ Estrutura do Projeto

```
.
├── src/
│   ├── config/        # Configurações do projeto (conexão com banco de dados)
│   ├── controllers/   # Controladores para manipulação de rotas
│   ├── models/        # Modelos de dados (schemas do Mongoose)
│   ├── routes/        # Definição de rotas da API
│   ├── errors/        # Classes personalizadas para tratamento de erros
│   ├── middlewares/   # Middlewares para tratamento de erros e rotas
│   └── app.js         # Configuração do Express
├── server.js          # Ponto de entrada da aplicação
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- MongoDB (local ou Atlas)
- NPM ou Yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   PORT=3000
   DB_CONNECTION_STRING=sua_string_de_conexao_mongodb
   ```
   
   > 💡 **Dica**: Para obter sua string de conexão MongoDB Atlas, acesse: https://account.mongodb.com/account/login

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📌 Endpoints da API

### Livros
- `GET /livros` - Lista todos os livros
- `GET /livros/:id` - Retorna um livro específico
- `GET /livros/busca?editora=nome` - Filtra livros por editora
- `POST /livros` - Cadastra um novo livro
- `PUT /livros/:id` - Atualiza um livro
- `DELETE /livros/:id` - Remove um livro

### Autores
- `GET /autores` - Lista todos os autores
- `GET /autores/:id` - Retorna um autor específico
- `POST /autores` - Cadastra um novo autor
- `PUT /autores/:id` - Atualiza um autor
- `DELETE /autores/:id` - Remove um autor

## 💾 Modelos de Dados

### Autor
```javascript
{
  nome: String,         // obrigatório
  nacionalidade: String
}
```

### Livro
```javascript
{
  titulo: String,       // obrigatório
  autor: ObjectId,      // obrigatório (referência a autores)
  editora: String,      // obrigatório
  numeroPaginas: Number
}
```

## 🛡️ Sistema de Tratamento de Erros

O projeto implementa um sistema hierárquico de tratamento de erros:

### Classes de Erro
- **BaseError**: Classe base para todos os erros personalizados
- **NotFound**: Erro 404 para recursos não encontrados
- **IncorrectRequest**: Erro 400 para solicitações incorretas
- **ValidationError**: Especialização para erros de validação do Mongoose

### Middlewares de Erro
- **errorHandling**: Middleware central que processa todos os erros
- **error404**: Middleware específico para tratar rotas não encontradas

```javascript
// Exemplo de uso do sistema de erros
try {
  const autorResultado = await autores.findById(id);
  if (autorResultado != null) {
    res.status(200).send(autorResultado);
  } else {
    next(new NotFound("Autor não encontrado."))
  }
} catch (erro) {
  next(erro)
}
```

## 📊 Relacionamentos no MongoDB

O projeto demonstra o relacionamento entre livros e autores usando referência por ID:

```javascript
autor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'autores',
  required: [true, 'O(a) autor(a) é obrigatório']
}
```

Ao consultar livros, utilizamos o método `populate()` para obter dados completos do autor:

```javascript
const livrosResultado = await livros.find()
  .populate("autor")
  .exec();
```

## 🚧 Recursos Avançados

- **Validação de Dados**: Mensagens personalizadas para validação de campos obrigatórios
- **Tratamento Centralizado de Erros**: Middleware que intercepta e trata todos os erros da aplicação
- **Respostas Padronizadas**: Formato consistente para respostas de erro
- **Consultas Avançadas**: Filtros e pesquisas específicas

## 📄 Licença

Este projeto foi desenvolvido como parte do curso da Alura, focando em boas práticas de desenvolvimento de APIs com Node.js e tratamento avançado de erros.
