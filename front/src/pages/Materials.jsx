import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListarMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [palavraChave, setPalavraChave] = useState("");
  const [materiaisFiltrados, setMateriaisFiltrados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/materiais")
      .then((response) => response.json())
      .then((data) => {
        setMateriais(data);
        setMateriaisFiltrados(data);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    const resultadosFiltrados = materiais.filter((material) => {
      return material[filtro]
        ?.toString()
        .toLowerCase()
        .includes(palavraChave.toLowerCase());
    });
    setMateriaisFiltrados(resultadosFiltrados);
  }, [palavraChave, filtro, materiais]);

  return (
    <div>
      <h1>Lista de Materiais Didáticos</h1>
      <div>
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="">Selecione um atributo</option>
          <option value="descricao">Descrição</option>
          <option value="numero_de_serie">Número de Série</option>
          <option value="data_de_aquisicao">Data de Aquisição</option>
          <option value="estado_de_conservacao">Estado de Conservação</option>
          <option value="localizacao_fisica">Localização Física</option>
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
            <th>ID</th>
            <th>Descrição</th>
            <th>Número de Série</th>
            <th>Data de Aquisição</th>
            <th>Estado de Conservação</th>
            <th>Localização Física</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {materiaisFiltrados.map((material, index) => (
            <tr key={index}>
              <td>{material.id}</td>
              <td>{material.descricao}</td>
              <td>{material.numero_de_serie}</td>
              <td>{material.data_de_aquisicao}</td>
              <td>{material.estado_de_conservacao}</td>
              <td>{material.localizacao_fisica}</td>
              <td>
                <img
                  src={material.uri_da_foto_do_material}
                  alt="Foto do Material"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button_redirect">
        <Link to="/Material/Add"> Adicionar novo material </Link>
      </button>
      <button className="button_redirect">
        <Link to="/"> Voltar para página inicial </Link>
      </button>
    </div>
  );
}

export default ListarMateriais;
