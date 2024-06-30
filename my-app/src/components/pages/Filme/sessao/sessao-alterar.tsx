import { useEffect, useState } from "react";
import { Sessao } from "../../../../models/Sessao";
import { Filme } from "../../../../models/Filme";
import { useNavigate, useParams } from "react-router-dom";

function SessaoAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sessao, setSessao] = useState<Sessao>({
    Id: 0,
    FilmeId: 0,
    Data: new Date(),
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
          setSessao(sessao);
        })
        .catch((error) => {
          console.error("Erro ao carregar sessão:", error);
        });
    }
  }, [id]);

  function alterarSessao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Realizar a alteração da sessão
    fetch(`http://localhost:5281/api/sessao/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessao),
    })
      .then((resposta) => resposta.json())
      .then((sessao: Sessao) => {
        navigate("/pages/sessao/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar sessão:", error);
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSessao((prevSessao) => ({
      ...prevSessao,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Alterar Sessão</h1>
      <form onSubmit={alterarSessao}>
        <label>Filme:</label>
        <input
          type="text"
          name="FilmeId"
          value={sessao.Filme.id} 
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
          type="text"
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
        <label>Preço Ingresso:</label>
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
