import React, { useEffect, useState } from "react";
import { Sessao } from "../../../../models/Sessao";
import { useNavigate, useParams } from "react-router-dom";

function SessaoAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [sessao, setSessao] = useState<Sessao>({
    Id: 0,
    FilmeId: 0,
    Data: new Date(),  // Inicializa com um novo Date
    Horario: "",
    Sala: "",
    PrecoIngresso: 0,
    IngressosDisponiveis: 0,
    Filme: {
      id: 0,
      titulo: "",
      genero: "",
      sinopse: "",
    },
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5281/api/sessao/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((sessao: Sessao) => {
          setSessao({
            ...sessao,
            Data: new Date(sessao.Data),  // Certifique-se de que Data é um objeto Date
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar sessão:", error);
        });
    }
  }, [id]);

  const alterarSessao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5281/api/sessao/alterar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessao),  // Enviando o objeto completo
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Sessão alterada com sucesso:", data);
      navigate("/pages/sessao/listar");
    } catch (error) {
      console.error("Erro ao alterar sessão:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSessao((prevSessao) => ({
      ...prevSessao,
      [name]: name === "Data" ? new Date(value) : value,
    }));
  };

  return (
    <div>
      <h1>Alterar Sessão</h1>
      <form onSubmit={alterarSessao}>
        <label>Filme ID:</label>
        <input
          type="number"
          name="FilmeId"
          value={sessao.FilmeId}
          onChange={handleChange}
          required
        />
        <br />
        <label>Data:</label>
        <input
          type="date"
          name="Data"
          value={sessao.Data.toISOString().split("T")[0]} 
          onChange={handleChange}
          required
        />
        <br />
        <label>Horário:</label>
        <input
          type="time"
          name="Horario"
          value={sessao.Horario}
          onChange={handleChange}
          required
        />
        <br />
        <label>Sala:</label>
        <input
          type="text"
          name="Sala"
          value={sessao.Sala}
          onChange={handleChange}
          required
        />
        <br />
        <label>Preço do Ingresso:</label>
        <input
          type="number"
          name="PrecoIngresso"
          value={sessao.PrecoIngresso}
          onChange={handleChange}
          required
        />
        <br />
        <label>Ingressos Disponíveis:</label>
        <input
          type="number"
          name="IngressosDisponiveis"
          value={sessao.IngressosDisponiveis}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default SessaoAlterar;
