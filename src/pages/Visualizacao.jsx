// Visualizacao.jsx — catálogo (rota "/jogos"), agrupado por plataforma (C = 3).
// Props recebidas do App:
//   title     -> constante com o título da página
//   registros -> o array do estado do App (somente leitura aqui)
// Também lê, via useLocation, a mensagem de sucesso que o Cadastro envia
// no state do navigate (regra B = 9).
import { Link, useLocation } from "react-router-dom";

// Cada opção do select vira um grupo com subtítulo.
const PLATAFORMAS = ["PC", "Console", "Mobile"];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Visualizacao({ title, registros }) {
  const location = useLocation();
  // state é null quando a pessoa chega por um link normal; por isso o "?."
  const mensagem = location.state?.mensagem;

  return (
    <section>
      <h1>{title}</h1>

      {mensagem && <p className="sucesso" role="status">{mensagem}</p>}

      {/* Lista vazia: mostra aviso com link para o cadastro (R6) */}
      {registros.length === 0 ? (
        <p>
          Nenhum jogo cadastrado ainda.{" "}
          <Link to="/jogos/novo">Cadastre o primeiro jogo</Link>.
        </p>
      ) : (
        PLATAFORMAS.map((plataforma) => {
          // filter separa só os registros desta plataforma
          const doGrupo = registros.filter((r) => r.plataforma === plataforma);
          return (
            <div key={plataforma} className="grupo">
              <h2>
                {plataforma} <span className="contagem">({doGrupo.length})</span>
              </h2>
              {doGrupo.length === 0 ? (
                <p className="vazio">Nenhum jogo nesta plataforma.</p>
              ) : (
                <ul className="lista">
                  {doGrupo.map((registro) => (
                    <li key={registro.id}>
                      <strong>{registro.titulo}</strong>
                      <span>{formatarPreco(registro.preco)}</span>
                      <span>Classificação: {registro.classificacao}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </section>
  );
}

export default Visualizacao;
