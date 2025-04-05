// Sendo o erro 400, abstraindo ele em uma classe separada

import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {
  // como tem outros erros que são 400, vamos receber apenas a messageError, e o status code continua 400
  constructor(messageError = "Um ou mais dados fornecidos estão incorretos!") {
    super(messageError, 400)
  }
}

export default IncorrectRequest;
