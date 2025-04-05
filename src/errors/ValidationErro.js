// Sendo uma classes expecífica para erros de validação, podendo detalhar mais sobre o erro

import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest {
  constructor(erro) {
    // dentro de "erro.error" nos temos acesso aos erros de validação do mongoose "ValidationError"
    const messageError = Object.values(erro.errors)
      .map(erro => erro.message).join('; ') // e ele vai nos retornar um array com os erros de validação, usando o "join" para transformar em uma string só

    super(`Os seguintes erros foram encontrados: ${messageError}`)
  }
}

export default ValidationError;
