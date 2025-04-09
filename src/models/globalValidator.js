import mongoose from "mongoose";

//  o "set" é um método que recebe um objeto com as configurações de validação que desejamos aplicar a todos os campos do tipo string.

// o primeiro parâmetro é o nome do validador, que neste caso é "validate".
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => {
    return valor.trim() !== "";
  },
  // caso não quera especificar o campo, podemos apenas tirar a arrow function e apenas a mensagem
  message: ({ path }) => `O campo ${path} é obrigatório.`,
})
