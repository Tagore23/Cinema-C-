import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Acesso } from "../../../../models/Acesso";

function AcessoCadastrar() {
  const navigate = useNavigate();

  const [nome, setNome] = useState<string>("");
  const [senha, setSenha] = useState<number>(0);

  const cadastrarAcesso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoAcesso: Acesso = {
      nome,
      senha,
      id: 0,
    };

    try {
      const response = await fetch("http://localhost:5281/api/acesso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoAcesso),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const data = await response.json();
      console.log("Acesso cadastrado com sucesso:", data);
      navigate("/pages/acesso/listar");
    } catch (error) {
      console.error("Erro ao cadastrar acesso:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Acesso</h1>
      <form onSubmit={cadastrarAcesso}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Senha:</label>
        <input
          type="number"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(Number(e.target.value))}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AcessoCadastrar;
