import React, { useEffect, useState } from "react";
import { Filme } from "../../../models/Filme";
import { useNavigate, useParams } from "react-router-dom";

function FilmeAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme>({
    id: 0,
    titulo: "",
    sinopse: "",
    genero: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5281/api/filme/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((filme: Filme) => {
          setFilme(filme);
        })
        .catch((error) => {
          console.error("Erro ao carregar filme:", error);
        });
    }
  }, [id]);

  function alterarFilme(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Realizar a alteração do filme
    fetch(`http://localhost:5281/api/filme/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filme),
    })
      .then((resposta) => resposta.json())
      .then((filme: Filme) => {
        navigate("/pages/filme/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar filme:", error);
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilme((prevFilme) => ({
      ...prevFilme,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Alterar Filme</h1>
      <form onSubmit={alterarFilme}>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={filme.titulo}
          onChange={handleChange}
          required
        />
        <br />
        <label>Sinopse:</label>
        <input
          type="text"
          name="sinopse"
          value={filme.sinopse}
          onChange={handleChange}
          required
        />
        <br />
        <label>Gênero:</label>
        <input
          type="text"
          name="genero"
          value={filme.genero}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FilmeAlterar;
