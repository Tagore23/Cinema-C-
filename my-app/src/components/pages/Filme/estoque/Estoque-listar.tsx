import React, { useEffect, useState } from "react";
import { Estoque } from "../../../../models/Estoque";
import { Link } from "react-router-dom";
import styled from 'styled-components';

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

function EstoqueListar() {
  const [estoque, setEstoque] = useState<Estoque[]>([]);

  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    try {
      const resposta = await fetch("http://localhost:5281/api/estoque/listar");
      if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.statusText);
      }
      const estoque = await resposta.json() as Estoque[];
      setEstoque(estoque);
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
    }
  };

  const adicionarNovoEstoque = (novoEstoque: Estoque) => {
    setEstoque([...estoque, novoEstoque]);
  };

  return (
    <div>
      <h1>Listar estoque</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Filme</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item) => (
            <tr key={item.id}>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell>{item.filme}</StyledTableCell>
              <StyledTableCell>{item.quantidade}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/estoque/editar/${item.id}`}>Editar</Link>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default EstoqueListar;
