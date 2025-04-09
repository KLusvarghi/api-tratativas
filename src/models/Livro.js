import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, 'O título do livro é obrigatório']
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, 'O(a) autor(a) é obrigatório'],
      autopopulate: { select: "nome" } // com isso ele irá popular o autor, mas só irá trazer o nome do autor
    },
    editora: {
      type: String,
      // Validações nativas do mongoose, passando dentro do array e o valor
      required: [true, 'A editora é obrigatória'],

      // Em caso de querer que o valor seja um valor específico, usamos o enum, podenod passar ele da forma abaixo, só que sem chaves e sem objeto, porém, neste caso, caso o valor fornecido não seja o que a gente quer, retornamdo uma mensagem de erro, podendo passar o valor que o usuário forneceu, dentro do {VALUE}
      enum: {
        values: ['Casa do Código', 'Alura'],
        message: 'A editora {VALUE} não é um valor permitido'
      },
    },
    numeroPaginas: {
      type: Number,
      // passando um valor mínimo e máximo, caso o valor fornecido não esteja dentro do intervalo, retorna uma mensagem de erro
      // min: [10, 'O número mínimo de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],
      // max: [5000, 'O número mínimo de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],

      // CRIANDO UM ERRO PERSONALIZADO COM O QUE O MOGOOSE NOS FORNECE
      validate: {
        // o nome da função, tem que se chamar "VALIDATOR" para que funcione
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: 'O número de p'
      }
      // caso queria apenas validar, o VALIDATE se torna uma arrow function e tira a propriedade 'message'
    }
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;

// DOc do mongoose para validações
// https://mongoosejs.com/docs/validation.html#custom-validators


// sendo válido os dois tipo de validações
// const novoSchema = new mongoose.Schema(
//   {
//     cpf: {
//       type: String,
//       validate: (valor) => valida_cpf(valor)
//     }
//   }
// );

// const novoSchema = new mongoose.Schema(
//   {
//     cpf: {
//       type: String,
//       validate: {
//         validator: (valor) => valida_cpf(valor),
//         message: "O CPF fornecido não é válido"
//       }
//     }
//   }
// );
