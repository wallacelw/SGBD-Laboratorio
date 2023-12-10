import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./style.css"
import Books from "./pages/Books";
import Materials from "./pages/Materials";
import AddMaterial from "./pages/AddMaterial";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import EditMaterial from "./pages/EditMaterial";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/Books" element={<Books/>}/>
          <Route path="/Materials" element={<Materials/>}/>
          <Route path="/Material/Add" element={<AddMaterial/>}/>
          <Route path="/Book/Add" element={<AddBook/>}/>
          <Route path="/Book/Edit/:isbn" element={<EditBook/>}/>
          <Route path="/Material/Edit/:id" element={<EditMaterial/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
