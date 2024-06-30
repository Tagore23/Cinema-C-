import { useEffect, useState } from "react";
import { Acesso } from "../../../../models/Acesso";
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

function AcessoListar() {
  const [acessos, setAcessos] = useState<Acesso[]>([]);

  useEffect(() => {
    carregarAcessos();
  }, []);

  const carregarAcessos = async () => {
    try {
      const resposta = await fetch("http://localhost:5281/api/acesso/listar");
      if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.statusText);
      }
      const acessos = await resposta.json() as Acesso[];
      setAcessos(acessos);
    } catch (error) {
      console.error("Erro ao carregar acessos:", error);
    }
  };

  return (
    <div>
      <h1>Listar acessos</h1>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {acessos.map((acesso) => (
            <tr key={acesso.id}>
              <StyledTableCell>{acesso.id}</StyledTableCell>
              <StyledTableCell>{acesso.nome}</StyledTableCell>
              <StyledTableCell>{acesso.senha}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/acesso/editar/${acesso.id}`}>Editar</Link>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default AcessoListar;
