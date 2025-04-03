import mongoose from "mongoose";

function errorHandling(error, req, res, next){
  // é um dado especifico de quando o mongoose não esta esperando, que no caso é um caracter não suportado pelo ObjectId do mongoose
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos" });
  } 
  // sendo esse um tipo de erro quando a informação requerida pelo nosso schema não é encontrada
  else if(error instanceof mongoose.Error.ValidationError){
    // dentro de "erro.error" nos temos acesso aos erros de validação do mongoose "ValidationError"
    const messageError = Object.values(error.errors)
    .map(erro => erro.message) // neste caso ele irá retornar [ 'Path `nome` is required.' ]
    console.log(messageError)
    // res.status(400).send({ message: "Erro na validação dos dados enviados" });
  }else {
    res.status(500).send({ message: `${error.message} - Erro interno no servidor` });
  }
}

export default errorHandling;


// MIDDLEWARE 
  // Eles sõa funçõe sque basicamente interceptam uma ação / Requisição
