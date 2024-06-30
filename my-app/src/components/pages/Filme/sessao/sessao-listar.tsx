import React, { useEffect, useState } from 'react';
import { Sessao } from '../../../../models/Sessao';
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
  const [error, setError] = useState<string | null>(null);  // Estado para gerenciar erros

  useEffect(() => {
    carregarSessoes();
  }, []);

  const carregarSessoes = async () => {
    try {
      const resposta = await fetch('http://localhost:5281/api/sessao/listar');
      if (!resposta.ok) {
        throw new Error('Erro na requisição: ' + resposta.statusText);
      }
      const sessoes = await resposta.json() as Sessao[];

      // Verifica se Data é uma string e a converte para um objeto Date
      const sessoesComDataFormatada = sessoes.map(sessao => {
        let data = new Date(sessao.Data);
        // Se a Data não for uma instância válida de Date, registre um erro
        if (!(data instanceof Date) || isNaN(data.getTime())) {
          console.error(`Data inválida para a sessão com ID ${sessao.Id}: ${sessao.Data}`);
          data = new Date();  // Substitua por uma data padrão ou trate conforme necessário
        }
        return { ...sessao, Data: data };  // Mantém Data como Date
      });

      console.log('Sessões carregadas:', sessoesComDataFormatada);  // Verifique os dados aqui
      setSessoes(sessoesComDataFormatada);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      setError('Ocorreu um erro ao carregar as sessões. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h1>Listar Sessões</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe a mensagem de erro se houver */}
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
          </tr>
        </thead>
        <tbody>
          {sessoes.map((sessao) => (
            <tr key={sessao.Id}>  {/* Usando sessao.Id como chave única */}
              <StyledTableCell>{sessao.Id}</StyledTableCell>
              <StyledTableCell>{sessao.Filme?.titulo || 'Filme não especificado'}</StyledTableCell>
              <StyledTableCell>
                {sessao.Data instanceof Date && !isNaN(sessao.Data.getTime())
                  ? format(sessao.Data, 'yyyy-MM-dd')  // Mostrando a data como '2024-06-01'
                  : 'Data inválida'}
              </StyledTableCell>
              <StyledTableCell>{sessao.Horario || 'Horário não especificado'}</StyledTableCell>
              <StyledTableCell>{sessao.Sala || 'Sala não especificada'}</StyledTableCell>
              <StyledTableCell>
                {typeof sessao.PrecoIngresso === 'number' ? sessao.PrecoIngresso.toFixed(2) : 'Preço não definido'}
              </StyledTableCell>
              <StyledTableCell>
                {typeof sessao.IngressosDisponiveis === 'number' ? sessao.IngressosDisponiveis : 'Ingressos não definidos'}
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default SessaoListar;
