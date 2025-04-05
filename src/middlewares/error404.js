import NotFound from "../errors/NotFound.js";

function error404(req, res, next) {
  // esse código só será executado se não existir uma rota que atenda a requisição
  const error404 = new NotFound()
  next(error404)
}

export default error404;
