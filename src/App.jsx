// App.jsx — componente raiz.
// Aqui ficam: (1) o estado centralizado com os registros, (2) a função
// adicionarRegistro que as páginas usam para alterar esse estado e
// (3) a declaração das rotas com Routes/Route.
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Rodape from "./components/Rodape.jsx";
import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Visualizacao from "./pages/Visualizacao.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

// Constantes de identidade (R7)
const NOME_SISTEMA = "Loja de games — João";
const NOME_COMPLETO = "João Paulo Oliveira";
const RA = "01989";

// Constante passada por props para a Visualização (R4)
const TITULO_VISUALIZACAO = "Catálogo de jogos";

// Os 3 registros de exemplo. O primeiro carrega o meu RA no campo principal (R3).
// Cada registro tem: id, titulo, preco, plataforma e classificacao.
const REGISTROS_INICIAIS = [
  { id: 1, titulo: "Celeste (RA 01989)", preco: 59.9, plataforma: "PC", classificacao: "10 anos" },
  { id: 2, titulo: "Mario Kart 8", preco: 299.0, plataforma: "Console", classificacao: "Livre" },
  { id: 3, titulo: "Stardew Valley", preco: 24.99, plataforma: "Mobile", classificacao: "10 anos" },
];

function App() {
  // Estado centralizado: único lugar onde o array de registros vive.
  const [registros, setRegistros] = useState(REGISTROS_INICIAIS);

  // Função entregue ao Cadastro por props. O Cadastro não recebe o setRegistros
  // direto: ele só consegue pedir "adicione este jogo". O spread cria um novo
  // array (imutável) com os registros antigos + o novo no final.
  function adicionarRegistro(novo) {
    setRegistros((anteriores) => [...anteriores, novo]);
    console.log("[App] registro adicionado ao estado:", novo);
  }

  // Quantidade calculada aqui no App e enviada para a Home e para a Navbar.
  const quantidade = registros.length;

  return (
    <div className="layout">
      <Navbar nomeSistema={NOME_SISTEMA} />

      <div className="conteudo">
        <main className="pagina">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  nomeSistema={NOME_SISTEMA}
                  nomeAluno={NOME_COMPLETO}
                  quantidade={quantidade}
                />
              }
            />
            <Route
              path="/jogos/novo"
              element={
                <Cadastro adicionarRegistro={adicionarRegistro} />
              }
            />
            <Route
              path="/jogos"
              element={
                <Visualizacao title={TITULO_VISUALIZACAO} registros={registros} />
              }
            />
            {/* Rota coringa: qualquer caminho que não casou com as anteriores */}
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </main>

        <Rodape nome={NOME_COMPLETO} ra={RA} />
      </div>
    </div>
  );
}

export default App;
