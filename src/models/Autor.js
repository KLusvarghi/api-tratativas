import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      // um dos recurso do mongoose é a validação, que permite que você defina regras de validação para os campos do seu modelo
      //antes ele era assim: required: true 
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionalidade: { type: String }
  },
  {
    versionKey: false
  }
)

const autores = mongoose.model("autores", autorSchema)

export default autores;
