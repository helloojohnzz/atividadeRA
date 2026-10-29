import { Link, useLocation } from "react-router-dom";

function NaoEncontrada() {
  const location = useLocation();

  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>
        O caminho <code>{location.pathname}</code> não existe neste sistema.
      </p>
      <p>
        <Link to="/" className="botao">Voltar para a Home</Link>
      </p>
    </section>
  );
}

export default NaoEncontrada;