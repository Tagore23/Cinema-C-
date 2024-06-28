import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filme } from "../../../models/Filme";

function FilmeCadastrar() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState<string>("");
  const [sinopse, setSinopse] = useState<string>("");
  const [genero, setGenero] = useState<string>("");

  const cadastrarFilme = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoFilme: Filme = {
      titulo,
      sinopse,
      genero,
      id: 0
    };

    try {
      const response = await fetch("http://localhost:5281/api/filme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoFilme),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Filme cadastrado com sucesso:", data);
      navigate("/pages/filme/listar");
    } catch (error) {
      console.error("Erro ao cadastrar filme:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Filme</h1>
      <form onSubmit={cadastrarFilme}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Sinopse:</label>
        <input
          type="text"
          placeholder="Digite a sinopse"
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          required
        />
        <br />
        <label>Gênero:</label>
        <input
          type="text"
          placeholder="Digite o gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FilmeCadastrar;
