// Navbar.jsx — menu lateral fixo à esquerda (layout D = 1).
// Recebe por props apenas o nome do sistema (mostrado no topo do menu).
// Usa NavLink: o React Router adiciona sozinho a classe "ativo" no link
// da rota atual (via função em className), então não precisa de <a href>
// e a página não recarrega ao navegar.
import { NavLink } from "react-router-dom";

function Navbar({ nomeSistema }) {
  // Função que decide a classe do link: se estiver ativo, ganha "ativo".
  const classeLink = ({ isActive }) => (isActive ? "link ativo" : "link");

  return (
    <nav className="navbar" aria-label="Menu principal">
      <div className="navbar-marca">{nomeSistema}</div>
      <ul>
        <li>
          {/* "end" evita que o link da Home fique ativo em todas as rotas */}
          <NavLink to="/" end className={classeLink}>
            Início
          </NavLink>
        </li>
        <li>
          {/* "end" aqui para que /jogos não fique ativo dentro de /jogos/novo */}
          <NavLink to="/jogos" end className={classeLink}>
            Catálogo
          </NavLink>
        </li>
        <li>
          <NavLink to="/jogos/novo" className={classeLink}>
            Cadastrar jogo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
