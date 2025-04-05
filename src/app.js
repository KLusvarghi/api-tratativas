import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorHandling from "./middlewares/errorHandling.js";
import error404 from "./middlewares/error404.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())
routes(app);

// esse é um meadleware, ele é executado antes de qualquer rota e em todas ou em determinadas requisições, e nele passamos 4 parametros, o primeiro é o error, o segundo é o request, o terceiro é o response e o quarto é o next, que é uma função que diz para o express continuar com a requisição

// registrnado mais um middleware para tratar erros 404 
// sendo essesncial colocar ele no final da aplicação, isso porque o express vai executar os middlewares na ordem que eles estão registrados, então se colocarmos ele antes de todas as rotas, ele vai interceptar todas as rotas e não vai deixar as rotas serem executadas, então é importante colocar ele no final da aplicação
app.use(error404)

// Esse é um middleware de error (que é caracterizado por sempre receber 4 parametros), que irá interceptar qualquer erro que for lançado pela nossa aplicação 
app.use(errorHandling)

export default app


// Todo middleware tem acesso à função next, que pode ser utilizada para executar o próximo middleware registrado na aplicação ou para executar diretamente o manipulador de erros quando recebe um erro como parâmetro.

