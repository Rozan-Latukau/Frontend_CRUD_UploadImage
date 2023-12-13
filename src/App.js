import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListLiga from "./component/ListLiga";
import AddLiga from "./component/addLiga";
import './style/style.css';
import EditLiga from "./component/editLiga";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListLiga/>}/>
      <Route path="addLiga" element={<AddLiga/>}></Route>
      <Route path="editLiga/:id" element={<EditLiga/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
