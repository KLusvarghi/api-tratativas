import BaseError from "./BaseError.js";

class NotFound extends BaseError {

  // o constructor é o que é recebido como parametro quando a classe é instanciada e recebe o valor que foi passado no momento da instanciação
  constructor(messageError) {
    super(messageError, 404)
  }
}

export default NotFound
