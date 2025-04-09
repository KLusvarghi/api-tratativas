// abordagem "barrel" = barril
  // É um arquivo que reexporta múltiplos módulos para simplificar e centralizar as importações. O objetivo é melhorar a organização e evitar repetições longas de caminhos de arquivos.
// para construir uma validaçõao e definir isso no nossos schemas.
// Neste caso vamos criar valisação global para todas as propriedades do tipo string
import "./globalValidator.js"
import autores from "./Autor.js";
import livros from "./Livro.js";

export { autores, livros };
