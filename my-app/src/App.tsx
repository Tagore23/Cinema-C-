import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import FilmeListar from "./components/pages/Filme/Filme-listar";
import SessaoCadastrar from "./components/pages/Filme/sessao/sessao-cadastrar";
import EstoqueCadastrar from "./components/pages/Filme/estoque/Estoque-cadastrar";
import AcessoCadastrar from "./components/pages/Filme/acesso/Acesso-cadastrar";
import AcessoListar from "./components/pages/Filme/acesso/Acesso-listar";
import SessaoListar from "./components/pages/Filme/sessao/sessao-listar";
import SessaoAlterar from "./components/pages/Filme/sessao/sessao-alterar";
import EstoqueListar from "./components/pages/Filme/estoque/Estoque-listar";
import { Estoque } from "./models/Estoque"; 
import FilmeCadastrar from "./components/pages/Filme/Filme-cadastrar";

function App() {
  const adicionarNovoEstoque = (novoEstoque: Estoque) => {
    // Lógica para adicionar novo estoque na lista global ou em outro estado compartilhado
    console.log("Novo estoque adicionado:", novoEstoque);
    // Exemplo básico: pode ser usado para atualizar um estado global, etc.
  };

  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/pages/filme/listar"}>Listar filmes</Link>
            </li>
            <li>
              <Link to={"/pages/filme"}>Cadastrar filmes</Link>
            </li>
            <li>
              <Link to={"/pages/sessao/cadastrar"}>Cadastrar sessões</Link>
            </li>
            <li>
              <Link to={"/pages/estoque/cadastrar"}>Cadastrar estoque</Link>
            </li>
            <li>
              <Link to={"/pages/acesso/cadastrar"}>Cadastrar acesso</Link>
            </li>
            <li>
              <Link to={"/pages/acesso/listar"}>Listar acessos</Link>
            </li>
            <li>
              <Link to={"/pages/sessao/listar"}>Listar sessões</Link>
            </li>
            <li>
              <Link to={"/pages/estoque/listar"}>Listar estoque</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FilmeListar />} />
          <Route path="/pages/filme/listar" element={<FilmeListar />} />
          <Route path="/pages/filme/" element={<FilmeCadastrar />} />
          <Route path="/pages/sessao/cadastrar" element={<SessaoCadastrar />} />
          <Route path="/pages/estoque/cadastrar" element={<EstoqueCadastrar onEstoqueAdicionado={adicionarNovoEstoque} />} />
          <Route path="/pages/acesso/cadastrar" element={<AcessoCadastrar />} />
          <Route path="/pages/acesso/listar" element={<AcessoListar />} />
          <Route path="/pages/sessao/listar" element={<SessaoListar />} />
          <Route path="/pages/sessao/alterar/:id" element={<SessaoAlterar />} />
          <Route path="/pages/estoque/listar" element={<EstoqueListar />} />
        </Routes>
        <footer>
          <p>Desenvolvido por Tagore, Gabriel Braga, Eduardo</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
