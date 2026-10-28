// Home.jsx — página inicial (rota "/").
// Props recebidas do App:
//   nomeSistema -> constante com o nome do sistema
//   nomeAluno   -> constante com meu nome completo
//   quantidade  -> registros.length, calculado no App a partir do estado
// Como a quantidade vem do estado, ela sobe sozinha quando cadastro um jogo.
import { Link } from "react-router-dom";

function Home({ nomeSistema, nomeAluno, quantidade }) {
  return (
    <section>
      <h1>{nomeSistema}</h1>
      <p className="subtitulo">Desenvolvido por {nomeAluno}</p>

      <div className="destaque">
        <span className="destaque-numero">{quantidade}</span>
        <span className="destaque-texto">
          {quantidade === 1 ? "jogo cadastrado" : "jogos cadastrados"}
        </span>
      </div>

      <p>
        <Link to="/jogos" className="botao">Ver catálogo</Link>{" "}
        <Link to="/jogos/novo" className="botao secundario">Cadastrar jogo</Link>
      </p>
    </section>
  );
}

export default Home;
