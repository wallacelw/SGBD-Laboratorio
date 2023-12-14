import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [emprestimosFiltrados, setEmprestimosFiltrados] = useState([]);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const authLevel = localStorage.getItem("authLevel");
    setIsAdmin(authLevel == 2); // Setta admin como um booleano guardando o dado se o usuário atual é admin ou não
  }, [isAdmin])

  const handleEdit = async (emprestimo) => {
    navigate(`/Edit-Emprestimo/${emprestimo.id}/${emprestimo.id_do_livro}/${emprestimo.id_do_material}/${emprestimo.id_do_usuario}`);
  };

  const handleReturn = async (emprestimo) => {
    await axios.put("http://localhost:3333/status/", emprestimo, {headers: headers});
    window.location.reload();
  };

  const handleDelete = async (emprestimo) => {
    try {
      if (emprestimo.id_do_livro) {
        await axios.delete(`http://localhost:3333/emprestimo/byISBN/${emprestimo.id}/${emprestimo.id_do_livro}`, {headers: headers}).then(
        (res) => toast(res.data.message))
      }

      else {
        await axios.delete(`http://localhost:3333/emprestimo/byID/${emprestimo.id}/${emprestimo.id_do_material}`, {headers: headers}).then(
        (res) => toast(res.data.message))
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
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
    let resultadosFiltrados;
    if (filtro === "") {
      resultadosFiltrados = [...emprestimos];
    } else {
      resultadosFiltrados = emprestimos.filter((emprestimo) => {
        return emprestimo[filtro]
          ?.toString()
          .toLowerCase()
          .includes(palavraChave.toLowerCase());
      });
    }
    setEmprestimosFiltrados(resultadosFiltrados);
  }, [palavraChave, filtro, emprestimos]);

  return (
    <div>
      <h1 className="title">Lista de Empréstimos</h1>
      <div className="box_input">
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Selecione um atributo</option>
          <option value="id">ID do Emprestimo</option>
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
      <table className="tabela">
        <thead>
          <tr>
            <th className="tabela">ID do Emprestimo</th>
            <th className="tabela">ID do Livro</th>
            <th className="tabela">ID do Material</th>
            <th className="tabela">ID do Usuário</th>
            <th className="tabela">Data do Empréstimo</th>
            <th className="tabela">Data de Devolução Prevista</th>
            <th className="tabela">Status do Empréstimo</th>
          </tr>
        </thead>
        <tbody>
          {emprestimosFiltrados.map((emprestimo, index) => (
            <tr className="tabela" key={index}>
              <td className="tabela">{emprestimo.id}</td>
              <td className="tabela">{emprestimo.id_do_livro}</td>
              <td className="tabela">{emprestimo.id_do_material}</td>
              <td className="tabela">{emprestimo.id_do_usuario}</td>
              <td className="tabela">{emprestimo.data_do_emprestimo}</td>
              <td className="tabela">{emprestimo.data_de_devolucao_prevista}</td>
              <td className="tabela">{emprestimo.status_do_emprestimo}</td>
              <td>
                <button onClick={() => handleReturn(emprestimo)}>Devolver</button>
              </td>
              { isAdmin ?
              <>
              <td>
                <button onClick={() => handleEdit(emprestimo)}>Editar</button>
              </td>
              <td>
                <button onClick={() => handleDelete(emprestimo)}>Apagar</button>
              </td>
              </>
              : null}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button_redirect" ><Link to="/"> Voltar para página inicial </Link></button>
    </div>
  );
}

export default Emprestimos;
