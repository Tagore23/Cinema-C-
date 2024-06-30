import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Estoque } from "../../../../models/Estoque";

interface Props {
  onEstoqueAdicionado: (novoEstoque: Estoque) => void;
}

function EstoqueCadastrar({ onEstoqueAdicionado }: Props) {
  const navigate = useNavigate();

  const [filme, setFilme] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");

  const cadastrarEstoque = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoEstoque: Estoque = {
      filme,
      quantidade,
      id: 0,
    };

    try {
      const response = await fetch("http://localhost:5281/api/estoque", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoEstoque),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Estoque cadastrado com sucesso:", data);
      onEstoqueAdicionado(data); // Adiciona o novo estoque à lista
      navigate("/pages/estoque/listar");
    } catch (error) {
      console.error("Erro ao cadastrar estoque:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Estoque</h1>
      <form onSubmit={cadastrarEstoque}>
        <label>Filme:</label>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={filme}
          onChange={(e) => setFilme(e.target.value)}
          required
        />
        <br />
        <label>Quantidade:</label>
        <input
          type="text"
          placeholder="Digite a quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default EstoqueCadastrar;
