import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import FilmeListar from "./components/pages/Filme/Filme-listar";
import SessaoCadastrar from "./components/pages/sessao/sessao-cadastrar";

function App() {
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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FilmeListar />} />
          <Route path="/pages/filme/listar" element={<FilmeListar />} />
          {/* Certifique-se de adicionar outras rotas conforme necessário */}
          <Route path="/pages/sessao/cadastrar" element={<SessaoCadastrar />} />
        </Routes>
        <footer>
          <p>Desenvolvido por Tagore, Gabriel Braga, Eduardo, Patrick</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
