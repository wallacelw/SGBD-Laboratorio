import {BrowserRouter, Routes, Route} from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/Add" element={<Add/>}/>
          <Route path="/Edit" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
