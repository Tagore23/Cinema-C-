import { useEffect, useState } from "react";
import { Filme } from "../../../models/Filme";
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

function FilmeListar() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = async () => {
    try {
      const resposta = await fetch("http://localhost:5281/api/filme/listar");
      if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.statusText);
      }
      const filmes = await resposta.json() as Filme[];
      setFilmes(filmes);
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
  };

  return (
    <div>
      <h1>Listar filmes</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Genero</th>
            <th>Sinopse</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((filme) => (
            <tr key={filme.id}>
              <StyledTableCell>{filme.id}</StyledTableCell>
              <StyledTableCell>{filme.titulo}</StyledTableCell>
              <StyledTableCell>{filme.genero}</StyledTableCell>
              <StyledTableCell>{filme.sinopse}</StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default FilmeListar;
