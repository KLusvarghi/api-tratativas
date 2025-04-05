import NotFound from "../errors/NotFound.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);

    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // trantando erro para quando não existe nenhum autor com o id informado
  static listarAutorPorId = async (req, res, next) => {

    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);
      if (autorResultado != null) { // se é diferente de nulo, é porque o id existe
        res.status(200).send(autorResultado);
      } else {
        // res.status(404).send({ message: "Autor não encontrado." });

        // e como antes a gente usava o status 404, podemos usar a classe "NotFound" para padonizar os erros
        next(new NotFound("Autor não encontrado."))
      }
    } catch (erro) {
      next(erro) // o "next" irá encamiar o error para o middleware de tratamento de erros que ta la em "app.js"

    }
  }


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      // essa linha quer dizer o seguinte: "Encontre o autor pelo id e atualize os campos que vierem no req.body, sobrescrevendo os valores existentes com os novos valores passados.
      await autores.findByIdAndUpdate(id, { $set: req.body });
      // antes era feito assim:
        // await author.findByIdAndUpdate(id, req.body)


      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      next(erro)
    }
  }

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      next(erro)
    }
  }


}

export default AutorController
