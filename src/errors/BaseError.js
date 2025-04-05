  // essa classe irá extender de Error que é uma classe nativa do javascript, e ela vai nos fornecer os métodos que precisamos para criar um erro
  class BaseError extends Error {
    // definindo valores padrão para o construtor
    constructor(messageError = "Error interno do servidor", statusCode = 500) {
      super(); // é obrigatorio para que a gente erde as propriedades e metodos da classe Error
      this.messageError = messageError;
      this.statusCode = statusCode;
    }

    sendResponse(res){
      res.status(this.statusCode).send({
        message: this.messageError,
        status: this.statusCode // é legal mandar o objeto de resposta com o status code, para que o front end consiga manipular isso com mais facilidade
      })
    }
  }

  export default BaseError;
