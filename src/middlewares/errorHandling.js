import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationErro.js";
import NotFound from "../errors/NotFound.js";

function errorHandling(erro, req, res, next) {
  // O erro "CastError" no Mongoose é um erro bastante comum que ocorre quando o Mongoose tenta converter (ou fazer "cast") um valor para um tipo específico definido no schema, mas não consegue realizar essa conversão corretamente.
  // Como exemplo: id inválido, tipos incompativeis, valores inválidos em arrays, etc
  if (erro instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res)
  }

  // é um tipo de erro que ocorre quando a validação de um documento falha durante operações de salvamento (save()) ou atualização.
  // Este erro acontece quando os dados que você está tentando salvar ou atualizar não atendem às regras de validação definidas no seu schema.
  else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res)
  } else if(erro instanceof NotFound){
    erro.sendResponse(res) // e como o objeto NOtFound foi extendido de "BaseError", o obj "erro" já possui o método sendResponse
  }else {
    new BaseError().sendResponse(res)
  }
}

export default errorHandling;


// MIDDLEWARE 
// Eles sõa funçõe sque basicamente interceptam uma ação / Requisição
