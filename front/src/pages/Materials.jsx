import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { headers } from "../utils/utils";
import { toast } from "react-toastify";

function ListarMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [materiaisFiltrados, setMateriaisFiltrados] = useState([]);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const authLevel = localStorage.getItem("authLevel");
    setIsAdmin(authLevel == 2); // Setta admin como um booleano guardando o dado se o usuário atual é admin ou não
  }, [isAdmin])


  const verificarStatusELidarComEmprestimo = (id, status) => {
    if (status === "disponivel") {
      navigate(`/Materials/Add-emprestimo/${id}`);
    } else {
      toast.error(
        "Material não está disponível, logo não é possível realizar empréstimo"
      );
    }
  };

  const handleEdit = (id) => {
    const materialDisponivel = materiais.find((material) => material.id === id);
    if (materialDisponivel) {
      verificarStatusELidarComEmprestimo(
        id,
        materialDisponivel.status_do_material
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3333/material/${id}`, { headers: headers })
        .then((res) => toast(res.data.message));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategorias = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/material-categorias/${id}`
      );
      return response.data; // assumindo que a API retorna uma lista de categorias
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return []; // retorna uma lista vazia em caso de erro
    }
  };

  useEffect(() => {
    fetch("http://localhost:3333/materiais")
      .then((response) => response.json())
      .then(async (data) => {
        const materiaisComCategorias = await Promise.all(
          data.map(async (material) => {
            const categorias = await fetchCategorias(material.id);
            return {
              ...material,
              categorias,
              data_de_aquisicao: new Date(
                material.data_de_aquisicao
              ).toLocaleDateString("pt-BR"),
            };
          })
        );
        setMateriais(materiaisComCategorias);
        setMateriaisFiltrados(materiaisComCategorias);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    let resultadosFiltrados;
    if (filtro === "") {
      resultadosFiltrados = [...materiais];
    } else {
      resultadosFiltrados = materiais.filter((material) => {
        return material[filtro]
          ?.toString()
          .toLowerCase()
          .includes(palavraChave.toLowerCase());
      });
    }
    setMateriaisFiltrados(resultadosFiltrados);
  }, [palavraChave, filtro, materiais]);

  return (
    <div>
      <h1 className="title">Lista de Materiais Didáticos</h1>
      <div className="box_input">
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Selecione um atributo</option>
          <option value="descricao">Descrição</option>
          <option value="numero_de_serie">Número de Série</option>
          <option value="categorias">Categorias</option>
          <option value="data_de_aquisicao">Data de Aquisição</option>
          <option value="estado_de_conservacao">Estado de Conservação</option>
          <option value="localizacao_fisica">Localização Física</option>
          <option value="status_do_material">Status do Material</option>
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
            <th className="tabela">ID</th>
            <th className="tabela">Descrição</th>
            <th className="tabela">Número de Série</th>
            <th className="tabela">Categorias</th>
            <th className="tabela">Data de Aquisição</th>
            <th className="tabela">Estado de Conservação</th>
            <th className="tabela">Localização Física</th>
            <th className="tabela">Status do Material</th>
            <th className="tabela">Foto</th>
          </tr>
        </thead>
        <tbody>
          {materiaisFiltrados.map((material, index) => (
            <tr className="tabela" key={index}>
              <td className="tabela">{material.id}</td>
              <td className="tabela">{material.descricao}</td>
              <td className="tabela">{material.numero_de_serie}</td>
              <td className="tabela">
                {material.categorias.map((categoria, idx) => (
                  <span key={idx}>
                    {categoria.categoria}
                    {idx < material.categorias.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="tabela">{material.data_de_aquisicao}</td>
              <td className="tabela">{material.estado_de_conservacao}</td>
              <td className="tabela">{material.localizacao_fisica}</td>
              <td className="tabela">{material.status_do_material}</td>
              <td>
                {material.uri_da_foto_do_material ? (
                  <img
                    src={material.uri_da_foto_do_material}
                    alt="Capa do Material"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : (
                  <span>Sem imagem</span>
                )}
              </td>
              <td>
                <button className="linha" onClick={() => handleEdit(material.id)}>
                  Solicitar emprestimo
                </button>
              </td>
              { isAdmin ?
              <>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(material.id)}
                >
                  {" "}
                  Apagar{" "}
                </button>
              </td>
              <td>
                <button className="edit">
                  {" "}
                  <Link to={`/Material/Edit/${material.id}`}>
                    {" "}
                    Editar{" "}
                  </Link>{" "}
                </button>
              </td>
              </>
              : null }
            </tr>
          ))}
        </tbody>
      </table>
      { isAdmin ?
      <button className="button_redirect">
        <Link to="/Material/Add"> Adicionar novo material </Link>
      </button>
      : null }
      <button className="button_redirect">
        <Link to="/"> Voltar para página inicial </Link>
      </button>
    </div>
  );
}

export default ListarMateriais;
