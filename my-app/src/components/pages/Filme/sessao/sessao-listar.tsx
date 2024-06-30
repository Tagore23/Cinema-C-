import React, { useEffect, useState } from "react";
import { Sessao } from "../../../../models/Sessao";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { format } from 'date-fns';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f9;
  }
`;
const StyledTableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

function SessaoListar() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);

  useEffect(() => {
    carregarSessoes();
  }, []);

  const carregarSessoes = async () => {
    try {
      const resposta = await fetch("http://localhost:5281/api/sessao/listar");
      if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.statusText);
      }
      const sessoes = await resposta.json() as Sessao[];
      setSessoes(sessoes);
    } catch (error) {
      console.error("Erro ao carregar sessões:", error);
    }
  };

  return (
    <div>
      <h1>Listar sessões</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Filme</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Sala</th>
            <th>Preço Ingresso</th>
            <th>Ingressos Disponíveis</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((sessao) => (
            <tr key={sessao.Id}>
              <StyledTableCell>{sessao.Id}</StyledTableCell>
              <StyledTableCell>{sessao.Filme?.titulo || 'Filme não especificado'}</StyledTableCell>
              <StyledTableCell>{sessao.Data ? format(new Date(sessao.Data), 'dd/MM/yyyy') : 'Data inválida'}</StyledTableCell>
              <StyledTableCell>{sessao.Horario}</StyledTableCell>
              <StyledTableCell>{sessao.Sala}</StyledTableCell>
              <StyledTableCell>{sessao.PrecoIngresso}</StyledTableCell>
              <StyledTableCell>{sessao.IngressosDisponiveis}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/sessao/editar/${sessao.Id}`}>Editar</Link>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default SessaoListar;
