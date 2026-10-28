// Rodape.jsx — aparece em todas as páginas (fica no App, fora do Routes).
// Props: nome (nome completo do aluno) e ra, definidos como constantes no App.
function Rodape({ nome, ra }) {
  return (
    <footer className="rodape">
      {nome} — RA {ra}
    </footer>
  );
}

export default Rodape;
