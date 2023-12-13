import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [emprestimosFiltrados, setEmprestimosFiltrados] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (emprestimo) => {
    if (emprestimo.id_do_livro) {
      navigate(`/editar-emprestimo/livro/${emprestimo.id_do_livro}`);
    } else if (emprestimo.id_do_material) {
      navigate(`/editar-emprestimo/material/${emprestimo.id_do_material}`);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3333/emprestimos")
      .then((response) => response.json())
      .then((data) => {
        setEmprestimos(data);
        setEmprestimosFiltrados(data);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    const resultadosFiltrados = emprestimos.filter((emprestimo) => {
      return emprestimo[filtro]
        ?.toString()
        .toLowerCase()
        .includes(palavraChave.toLowerCase());
    });
    setEmprestimosFiltrados(resultadosFiltrados);
  }, [palavraChave, filtro, emprestimos]);

  return (
    <div>
      <h1>Lista de Empréstimos</h1>
      <div>
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Selecione um atributo</option>
          <option value="id_do_livro">ID do Livro</option>
          <option value="id_do_material">ID do Material</option>
          <option value="id_do_usuario">ID do Usuário</option>
          <option value="data_do_emprestimo">Data do Empréstimo</option>
          <option value="data_de_devolucao_prevista">
            Data de Devolução Prevista
          </option>
          <option value="status_do_emprestimo">Status do Empréstimo</option>
        </select>
        <input
          type="text"
          placeholder="Digite a palavra-chave"
          value={palavraChave}
          onChange={(e) => setPalavraChave(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID do Livro</th>
            <th>ID do Material</th>
            <th>ID do Usuário</th>
            <th>Data do Empréstimo</th>
            <th>Data de Devolução Prevista</th>
            <th>Status do Empréstimo</th>
          </tr>
        </thead>
        <tbody>
          {emprestimosFiltrados.map((emprestimo, index) => (
            <tr key={index}>
              <td>{emprestimo.id_do_livro}</td>
              <td>{emprestimo.id_do_material}</td>
              <td>{emprestimo.id_do_usuario}</td>
              <td>{emprestimo.data_do_emprestimo}</td>
              <td>{emprestimo.data_de_devolucao_prevista}</td>
              <td>{emprestimo.status_do_emprestimo}</td>
              <td>
                <button onClick={() => handleEdit(emprestimo)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emprestimos;