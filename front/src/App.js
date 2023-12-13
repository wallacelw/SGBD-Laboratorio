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
import ListarEmprestimos from "./pages/ListarEmprestimos";
import EditEmprestimo from "./pages/EditEmprestimo";
import AddBookEmprestimo from "./pages/AddBookEmprestimo";
import AddMaterialEmprestimo from "./pages/AddMaterialEmprestimo";

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
            path="/Book/Add-emprestimo/:isbn"
            element={<AddBookEmprestimo />}
          />

          <Route path="/Materials" element={<Materials />} />
          <Route path="/Material/Add" element={<AddMaterial />} />
          <Route path="/Material/Edit/:id" element={<EditMaterial />} />

          <Route
            path="/Materials/Add-emprestimo/:id"
            element={<AddMaterialEmprestimo />}
          />

          {/* <Route path="/Emprestimo/Add" element={<AddEmprestimos />} /> */}
          <Route path="/Emprestimo/Search" element={<ListarEmprestimos />} />
          <Route path="/Edit-Emprestimo/:id/:idlivro/:idmaterial/:idusuario" element={<EditEmprestimo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
