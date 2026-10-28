// Cadastro.jsx — formulário de novo jogo (rota "/jogos/novo").
// Prop recebida do App:
//   adicionarRegistro -> função criada no App que insere o jogo no estado.
//                        A página nunca mexe no array diretamente.
// Regras: nenhum campo vazio + regra B = 9 (após salvar, a Visualização
// mostra uma mensagem de sucesso enviada pelo state do navigate).
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Opções do <select> (Tabela A: Plataforma)
const PLATAFORMAS = ["PC", "Console", "Mobile"];

// Estado inicial do formulário, usado também para limpar depois de salvar.
const FORM_VAZIO = { titulo: "", preco: "", plataforma: "", classificacao: "" };

function Cadastro({ adicionarRegistro }) {
  // Formulário controlado: cada input lê o valor daqui e escreve aqui.
  const [form, setForm] = useState(FORM_VAZIO);
  // Mensagens de erro, uma por campo (aparece abaixo do campo inválido).
  const [erros, setErros] = useState({});
  const navigate = useNavigate();

  // Um único handler para todos os campos: usa o atributo name do input
  // para saber qual propriedade do objeto atualizar (spread = cópia nova).
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Confere os campos e devolve um objeto { campo: "mensagem" }.
  // Se voltar vazio, o formulário está válido.
  function validar() {
    const novosErros = {};
    if (form.titulo.trim() === "") novosErros.titulo = "Informe o título do jogo.";
    if (form.preco === "") novosErros.preco = "Informe o preço.";
    else if (Number(form.preco) < 0) novosErros.preco = "O preço não pode ser negativo.";
    if (form.plataforma === "") novosErros.plataforma = "Escolha uma plataforma.";
    if (form.classificacao.trim() === "")
      novosErros.classificacao = "Informe a classificação etária.";
    return novosErros;
  }

  function handleSubmit(e) {
    e.preventDefault(); // evita o recarregamento da página
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return; // há erro: não salva

    // Monta o novo registro. Date.now() gera um id único.
    const novo = {
      id: Date.now(),
      titulo: form.titulo.trim(),
      preco: Number(form.preco),
      plataforma: form.plataforma,
      classificacao: form.classificacao.trim(),
    };

    adicionarRegistro(novo); // função vinda do App via props
    setForm(FORM_VAZIO);

    // Regra B = 9: mando a mensagem de sucesso no state da navegação.
    // A Visualização lê isso com useLocation().state.
    navigate("/jogos", {
      state: { mensagem: `"${novo.titulo}" foi cadastrado com sucesso!` },
    });
  }

  return (
    <section>
      <h1>Cadastrar jogo</h1>

      <form onSubmit={handleSubmit} noValidate className="formulario">
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={form.titulo}
            onChange={handleChange}
          />
          {erros.titulo && <small className="erro">{erros.titulo}</small>}
        </div>

        <div className="campo">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            id="preco"
            name="preco"
            type="number"
            step="0.01"
            value={form.preco}
            onChange={handleChange}
          />
          {erros.preco && <small className="erro">{erros.preco}</small>}
        </div>

        <div className="campo">
          <label htmlFor="plataforma">Plataforma</label>
          <select
            id="plataforma"
            name="plataforma"
            value={form.plataforma}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            {PLATAFORMAS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {erros.plataforma && <small className="erro">{erros.plataforma}</small>}
        </div>

        <div className="campo">
          <label htmlFor="classificacao">Classificação etária</label>
          <input
            id="classificacao"
            name="classificacao"
            type="text"
            placeholder="Ex.: Livre, 12 anos, 18 anos"
            value={form.classificacao}
            onChange={handleChange}
          />
          {erros.classificacao && <small className="erro">{erros.classificacao}</small>}
        </div>

        <button type="submit" className="botao">Salvar jogo</button>
      </form>
    </section>
  );
}

export default Cadastro;
