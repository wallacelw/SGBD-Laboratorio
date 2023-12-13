import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Books from "./pages/Books";
import Materials from "./pages/Materials";
import AddMaterial from "./pages/AddMaterial";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import EditMaterial from "./pages/EditMaterial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import Emprestimos from "./pages/Emprestimos";
import AddEmprestimos from "./pages/AddEmprestimo";
import ListarEmprestimos from "./pages/ListarEmprestimos";
import EditarEmprestimo from "./pages/EditEmprestimo";
import AddBookEmprestimo from "./pages/AddBookEmprestimo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/User/Edit/:id" element={<EditUser />} />

          <Route path="/Books" element={<Books />} />
          <Route path="/Book/Add" element={<AddBook />} />
          <Route path="/Book/Edit/:isbn" element={<EditBook />} />
          <Route
            path="/Book/adicionar-emprestimo/:isbn"
            element={<AddBookEmprestimo />}
          />

          <Route path="/Materials" element={<Materials />} />
          <Route path="/Material/Add" element={<AddMaterial />} />
          <Route path="/Material/Edit/:id" element={<EditMaterial />} />

          <Route path="/Emprestimos" element={<Emprestimos />} />
          <Route path="/Emprestimo/Add" element={<AddEmprestimos />} />
          <Route path="/Emprestimo/Search" element={<ListarEmprestimos />} />
          <Route path="/editar-emprestimo/:id" element={<EditarEmprestimo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
