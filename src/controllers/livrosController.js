import NotFound from "../errors/NotFound.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  // static listarLivros = async (req, res, next) => {

  //   // Trabalahndo com paginação
  //   try {
  //     // let { limite = 2, pagina = 1, campoOrdenacao = "_id", ordem = -1 } = req.query

  //     // No mercado, pode se ver algo mais consiso do tipo:
  //     let { limite = 2, pagina = 1, ordenacao = "_id:-1" } = req.query

  //     let [campoOrdenacao, ordem] = ordenacao.split(":")

  //     limite = parseInt(limite)
  //     pagina = parseInt(pagina)
  //     ordem = parseInt(ordem)


  //     if(limite > 0 && pagina > 0){

  //       const livrosResultado = await livros.find()
  //       // 1 pé crescente e -1 é descrescente
  //       .sort({ [campoOrdenacao]: ordem })
  //       // se eu quisesse ordenar pelo mais rescente, neste caso eu consigo ordenar pelo _id (neste caso o id gerado pelo mongoDB é de ordem crescente) tendo que ordenar ele de forma descrescente
  //       // .sort({ _id: -1 })

  //       // o metodo skip é usado para pular os registros, então nesse calcula a gente basicamente vai pular os registros que já foram trazidos, assim conseguimos fazer a paginação e não fazendo requisições desnecessárias
  //       .skip((pagina - 1) * limite)
  //       // o metodo limit é usado para limitar a quantidade de registros que serão trazidos
  //       .limit(limite)
  //       .populate("autor")
  //       .exec();

  //       res.status(200).json(livrosResultado);
  //     }else{
  //       next(new IncorrectRequest())
  //     }
  //   } catch (erro) {
  //     next(erro)
  //   }
  // }


  // Trabalahndo com paginação do midlleware
  static listarLivros = async (req, res, next) => {

    try {
      // quando atribuimos o "find" para a variavel, quando passamos o mouse por cima, conseguimos ver que ela é do tipo query e podemos aplicar os metodos do mongoose
      const buscaLivros = livros.find();

      // para enviar essa info para o PROXIMO middleware (o que vem em sequencia dele no "livrosROutes.js")
      req.resultado = buscaLivros

      next() // assim executando o next, estamos dizendo para o express que o middleware foi executado e agora ele vai para o próximo middleware

    } catch (erro) {
      next(erro)
    }
  }


  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor")
        .exec();

      res.status(200).send(livroResultados);
    } catch (erro) {
      next(new NotFound("Id do Livro não encontrado."))
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      next(new NotFound("Id do Livro não encontrado."))
    }
  }

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      next(new NotFound("Id do Livro não encontrado."))
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      // Aqui nos estamos fazendo uma busca simples, sem usar o populate.
      // para acessar basta: http://localhost:3000/livros/busca?editora=RAN
      // const editora = req.query.editora;

      const busca = await processaBusca(req.query);

      if (busca !== null) {
        // e em fim podemos passar apenas o objeto busca
        // para trazer os dados do autor, precisamos fazer o populate passando o nome do campo que queremos
        // tireando o await porque como trazemos a paginação para ele, o middleware já vai fazer o processamento
        const livrosResultado = livros
          .find(busca)
          .populate("autor")

        req.resultado = livrosResultado

        next();
        // res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro)
    }
  }
}


async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params; //pegado todos os  parametros da query

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) {
    busca.numeroPaginas = {};

    // gte = Greater Than or Equal = Maior ou igual que
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    // lte = Less Than or Equal = Menor ou igual que
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  }

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}




// static listarLivroPorFiltro = async (req, res, next) => {
//   try {
//     // Aqui nos estamos fazendo uma busca simples, sem usar o populate.
//     // para acessar basta: http://localhost:3000/livros/busca?editora=RAN
//     // const editora = req.query.editora;

//     // fazendo uma busca mais complexa
//     const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query; //pegado todos os  parametros da query

//     // isso quer dizer que o regex vai procurar o titulo, independente de ser maiusculo ou minusculo
//     const regex = new RegExp(titulo, "i");

//     //---- caso eu queria apenas um filtro ou outro, eu posso:
//     const busca = {}
//     if (editora) busca.editora = editora
//     // if(titulo) busca.titulo = titulo

//     // neste caso, ele não vai fazer a busca pelo titulo, mas sim pelo regex
//     // if(titulo) busca.titulo = regex

//     // mas tamebm podemos utilizar os operadores do mogoose
//     // eu poderia passar dessa maneira:
//     // if(titulo) busca.titulo = { $regex: regex }

//     // ou dessa maneira:
//     if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }


//     if (minPaginas || maxPaginas) {
//       busca.numeroPaginas = {}

//       // gte = Greater Than or Equal = Maior ou igual que

//       if (minPaginas) busca.numeroPaginas.$gte = minPaginas
//       // lte = Less Than or Equal = Menor ou igual que

//       if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas
//     }

//     // filtrando o autor dentro de livros, sendo que o schema de livros, temos apenas o id do autor, então precisamos fazer uma busca no schema de autores
//     if(nomeAutor){
//       const autor = await autores.findOne({ nome: nomeAutor })
//       if(autor){

//       }
//     }


//     // e em fim podemos passar apenas o objeto busca
//     const livrosResultado = await livros.find(busca);

//     // Podendo buscar com - http://localhost:3000/livros/busca?editora=RAN&titulo=Star Wars 
//     // const livrosResultado = await livros.find({ editora: editora, titulo: titulo });



//     res.status(200).send(livrosResultado);
//   } catch (erro) {
//     next(erro)
//   }
// }

export default LivroController
