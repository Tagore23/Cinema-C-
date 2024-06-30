import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sessao } from "../../../../models/Sessao";

function SessaoCadastrar() {
  const navigate = useNavigate();

  const [filmeId, setFilmeId] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [sala, setSala] = useState<string>("");
  const [precoIngresso, setPrecoIngresso] = useState<number>(0);
  const [ingressosDisponiveis, setIngressosDisponiveis] = useState<number>(0);

  const cadastrarSessao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convertendo a data e o horário para o formato Date
    const dataFormatada = new Date(`${data}T${horario}:00`);

    const novaSessao: Sessao = {
      Id: 0, // Id será gerado pelo banco de dados
      FilmeId: filmeId,
      Data: dataFormatada, // Usando um objeto Date aqui
      Horario: horario,
      Sala: sala,
      PrecoIngresso: precoIngresso,
      IngressosDisponiveis: ingressosDisponiveis,
      Filme: {} as any // Assumindo que o filme será relacionado apenas pelo Id
    };

    try {
      const response = await fetch("http://localhost:5281/api/sessao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaSessao),  // Enviando o objeto completo
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Sessão cadastrada com sucesso:", data);
      navigate("/pages/sessao/listar");
    } catch (error) {
      console.error("Erro ao cadastrar sessão:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Sessão</h1>
      <form onSubmit={cadastrarSessao}>
        <label>Filme ID:</label>
        <input
          type="number"
          placeholder="Digite o ID do filme"
          value={filmeId}
          onChange={(e) => setFilmeId(Number(e.target.value))}
          required
        />
        <br />
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <br />
        <label>Horário:</label>
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        />
        <br />
        <label>Sala:</label>
        <input
          type="text"
          placeholder="Digite a sala"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          required
        />
        <br />
        <label>Preço do Ingresso:</label>
        <input
          type="number"
          placeholder="Digite o preço do ingresso"
          value={precoIngresso}
          onChange={(e) => setPrecoIngresso(Number(e.target.value))}
          required
        />
        <br />
        <label>Ingressos Disponíveis:</label>
        <input
          type="number"
          placeholder="Digite o número de ingressos disponíveis"
          value={ingressosDisponiveis}
          onChange={(e) => setIngressosDisponiveis(Number(e.target.value))}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default SessaoCadastrar;
